# Parse Overpass JSON: 国道1号 and 旧東海道 geometry into two ordered latlng arrays.
# Usage: python parse_routes.py [path_to_overpass_response.json]

import json, sys

def geom_to_latlngs(geom):
    return [[p["lat"], p["lon"]] for p in geom]

def way_ends(geom):
    if not geom or len(geom) < 2:
        return None, None
    return (geom[0]["lat"], geom[0]["lon"]), (geom[-1]["lat"], geom[-1]["lon"])

def dist2(a, b):
    return (a[0]-b[0])**2 + (a[1]-b[1])**2

def connect_ways(ways_with_geom, eastward=True):
    # ways_with_geom: list of (bounds_minlon, geometry). Build one path 湯本→国府津 (eastward=True).
    ways = sorted(ways_with_geom, key=lambda x: x[0])
    out = []
    used = [False] * len(ways)
    for i, (minlon, geom) in enumerate(ways):
        if used[i]:
            continue
        used[i] = True
        seg = geom if isinstance(geom[0], list) else geom_to_latlngs(geom)
        out.extend(seg)
        last_lon = seg[-1][1]
        while True:
            best_j = -1
            best_d = 1e9
            best_new_lon = last_lon
            reverse = False
            for j in range(len(ways)):
                if used[j]:
                    continue
                g = ways[j][1]
                pts = g if isinstance(g[0], list) else geom_to_latlngs(g)
                s_lon, e_lon = pts[0][1], pts[-1][1]
                d1, d2 = dist2((out[-1][0], out[-1][1]), (pts[0][0], pts[0][1])), dist2((out[-1][0], out[-1][1]), (pts[-1][0], pts[-1][1]))
                min_progress = 0.00001
                # When distance ties, prefer the segment that extends further east (larger new_lon).
                take1 = (eastward and s_lon >= last_lon + min_progress or not eastward and s_lon <= last_lon - min_progress) and (d1 < best_d or (d1 <= best_d + 1e-12 and (eastward and s_lon > best_new_lon or not eastward and s_lon < best_new_lon)))
                if take1:
                    best_d = d1
                    best_j = j
                    best_new_lon = s_lon
                    reverse = True
                take2 = (eastward and e_lon >= last_lon + min_progress or not eastward and e_lon <= last_lon - min_progress) and (d2 < best_d or (d2 <= best_d + 1e-12 and (eastward and e_lon > best_new_lon or not eastward and e_lon < best_new_lon)))
                if take2:
                    best_d = d2
                    best_j = j
                    best_new_lon = e_lon
                    reverse = False
            if best_j < 0 or best_d > 0.00015:
                break
            used[best_j] = True
            g = ways[best_j][1]
            pts = g if isinstance(g[0], list) else geom_to_latlngs(g)
            if reverse:
                pts = pts[::-1]
            if pts and dist2((out[-1][0], out[-1][1]), (pts[0][0], pts[0][1])) < 1e-12:
                pts = pts[1:]
            out.extend(pts)
            last_lon = out[-1][1]
    return out

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else None
    if path:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = json.load(sys.stdin)
    elements = data.get("elements", [])
    ways = [e for e in elements if e.get("type") == "way" and "geometry" in e]
    route1_ways = []
    old_tokaido_ways = []
    for w in ways:
        name = (w.get("tags") or {}).get("name", "")
        if name == "国道1号":
            b = w.get("bounds", {})
            minlon = b.get("minlon", 0)
            route1_ways.append((minlon, w["geometry"]))
        elif name and "旧東海道" in name:
            b = w.get("bounds", {})
            minlon = b.get("minlon", 0)
            old_tokaido_ways.append((minlon, w["geometry"]))
    def remove_backtracks(latlngs, eastward=True, min_lon_step=0.00005):
        """Drop points that go backward (west when eastward). Keep points that are east or ~same lon."""
        if len(latlngs) < 2:
            return latlngs
        out = [latlngs[0]]
        for p in latlngs[1:]:
            lon = p[1]
            last_lon = out[-1][1]
            if eastward and lon < last_lon - min_lon_step:
                continue
            if not eastward and lon > last_lon + min_lon_step:
                continue
            out.append(p)
        return out
    route1 = remove_backtracks(connect_ways(route1_ways), eastward=True)
    old_tokaido = connect_ways(old_tokaido_ways)
    # Bbox 箱根湯本〜国府津: filter to 35.22-35.29, 139.09-139.22 so we don't include way-off segments
    def in_bbox(pt):
        lat, lon = pt[0], pt[1]
        return 35.22 <= lat <= 35.29 and 139.09 <= lon <= 139.22
    route1 = [p for p in route1 if in_bbox(p)]
    old_tokaido = [p for p in old_tokaido if in_bbox(p)]
    # Output JS arrays
    def js_array(arr, name):
        lines = []
        for i in range(0, len(arr), 4):
            chunk = arr[i:i+4]
            line = ", ".join("[%.7g, %.7g]" % (p[0], p[1]) for p in chunk)
            lines.append("          " + line + ("," if i+4 < len(arr) else ""))
        return "\n".join(lines)
    print("// 国道1号 (OSM ways name=国道1号)")
    print("var route1Latlngs = [")
    print(js_array(route1, "route1"))
    print("        ];")
    print("")
    print("// 旧東海道 (OSM ways name~旧東海道)")
    print("var oldTokaidoLatlngs = [")
    print(js_array(old_tokaido, "old_tokaido"))
    print("        ];")

if __name__ == "__main__":
    main()
