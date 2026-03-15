(function () {
  var mapEl = document.getElementById('spots-map');
  if (!mapEl) return;
  var center = [35.2455, 139.1532];
  var map = L.map('spots-map').setView(center, 17);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
  function buildTooltipHtml(title, description, sources) {
    var html = '<span class="spot-tooltip-title">' + title + '</span><span class="spot-tooltip-desc">' + (description || '') + '</span>';
    if (sources && sources.length) {
      html += '<span class="spot-tooltip-sources">出典: ';
      html += sources.map(function (x) { return '<a href="' + x.url + '" target="_blank" rel="noopener noreferrer">' + x.label + '</a>'; }).join('、');
      html += '</span>';
    }
    return html;
  }
  var spots = [
    { lat: 35.24562, lng: 139.15456, name: '旧松本剛吉別邸（南町2-1-27）', label: '旧松本剛吉別邸', color: '#b45309', tooltipDirection: null,
      description: '大正12年（1923年）頃、貴族院議員・松本剛吉が建てた別邸。数寄屋風主屋・茶室「雨香亭」・回遊式庭園が特徴で、近代小田原の別邸文化を象徴する。平成28年（2016年）に小田原市歴史的風致形成建造物に指定され、2019年市有化後一般公開されている。',
      sources: [{ label: '松本剛吉記念館', url: 'https://www.matsumoto-goukichi.com/building.html' }, { label: '小田原市', url: 'https://www.city.odawara.kanagawa.jp/field/lifelong/culture/historical_structure/p20642.html' }] },
    { lat: 35.244773, lng: 139.153718, name: '小田原文学館・北村透谷碑・白秋童謡館・尾崎一雄邸（南町2-3-4）', label: '小田原文学館ほか', color: '#be185d', tooltipDirection: null,
      description: '北村透谷碑（島崎藤村揮毫の碑文）、白秋童謡館（北原白秋の童謡資料・登録有形文化財）、尾崎一雄邸「冬眠居」書斎が移築保存されている文学ゆかりの施設群。大正期に田中光顕別邸として建てられた建物を活用。',
      sources: [{ label: '小田原市（文学館）', url: 'https://www.city.odawara.kanagawa.jp/public-i/facilities/literature-museum/bungakukan.html' }, { label: 'おだわらデジタルミュージアム', url: 'https://odawara-digital-museum.jp/point/detail/617/' }] },
    { lat: 35.245629976659124, lng: 139.1525974526273, name: '静山荘（旧望月軍四郎別邸）（南町3-1-20）', label: '静山荘', color: '#0d9488', tooltipDirection: null,
      description: '実業家・望月軍四郎が小田原市南町に構えた別荘。農家を移築した風情ある建物で、諸白・西海子小路交差点付近に位置する。市の優れた建造物として歴史的風致に位置づけられている。',
      sources: [{ label: 'おだわらデジタルミュージアム', url: 'https://odawara-digital-museum.jp/point/detail/176/' }] },
    { lat: 35.246666135257605, lng: 139.15049167524205, name: '豆相人車鉄道 旧小田原駅跡（早川口・国道1号付近）', label: '旧小田原駅跡', color: '#c2410c', tooltipDirection: null,
      description: '明治29年（1896年）に熱海方面へ開設された豆相人車鉄道の旧小田原駅の跡地。人力で客車を引く珍しい鉄道の起点で、現在のJR小田原駅より南東の早川口交差点付近に石碑が残る。東海道本線熱海線開通後に廃止されたが、小田原の交通史を伝える遺構である。',
      sources: [{ label: 'sloway（豆相人車鉄道）', url: 'http://sloway.net/zusou/history.html' }] },
    { lat: 35.2474585, lng: 139.1523143, name: '対潮閣跡（南町1-5-32付近）', label: '対潮閣跡', color: '#7c3aed', tooltipDirection: null,
      description: '山下汽船（現・商船三井）創業者・山下亀三郎が大正期に建てた海の見える別邸の跡。日露戦争の英雄・秋山真之が大正7年（1918年）2月にここで49歳で逝去した。石垣・釣鐘石・通用門が残り、近隣の静閑亭や旧松本剛吉別邸とともに南町の近代史スポットである。',
      sources: [{ label: '歴史の風景', url: 'https://yhistoricalplace2.web.fc2.com/historical_place/kamesaburo_yamashita/index.html' }, { label: 'note', url: 'https://note.com/seikantei/n/nb68282b1f87a' }] },
    { lat: 35.24571985815069, lng: 139.15322363345845, name: '自怡荘跡地（野崎幻庵別荘・メガネスーパー創業者豪邸付近）', label: '自怡荘跡地', color: '#b91c1c', tooltipDirection: null, shape: 'star',
      description: '野崎幻庵（野崎廣太）が十字町・諸白小路（現南町）に構えた別荘「自怡荘」の跡地。敷地内に茶室「葉雨庵」があった。のちメガネスーパー創業者がこの地に豪邸を建てた経緯で知られる。',
      sources: [{ label: '歴史の風景（野崎幻庵）', url: 'https://yhistoricalplace2.web.fc2.com/historical_place/youan/index.html' }, { label: 'rarea', url: 'https://rarea.events/event/195726' }] },
    { lat: 35.24487415407747, lng: 139.15529778011884, name: 'かこながや（水主長屋）', label: 'かこながや（水主長屋）', color: '#0c4a6e', tooltipDirection: null,
      description: '江戸時代、稲葉氏が藩主の頃、御船小屋の隣に水主（水軍の船乗り）の長屋があったことに由来する町地名。「万治図」（1660年）の小田原城絵図に「御船小屋」と並んで記載され、城下町の水運・船関連の労働者が住む地域だった。町名碑が現存する。',
      sources: [{ label: '0465.net', url: 'https://www.0465.net/map/index.html?i=801' }, { label: '小田原市', url: 'https://www.city.odawara.kanagawa.jp/global-image/units/500025/1-20210902175224.pdf' }, { label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { lat: 35.24719609514179, lng: 139.15370991255148, name: '筋違橋町（すじかいばしちょう）', label: '筋違橋町', color: '#6b21a8', tooltipDirection: null,
      description: '小田原城下の歴史的町名。東海道筋から南へ延びる小路として、諸白小路・狩野殿小路・安斎小路がこの筋違橋町の小路として史料に並んで記されている。筋違橋（斜めに架かった橋）に由来する地名とされ、城下町の武家地・町人地の区画を表す町名の一つである。',
      sources: [{ label: '小田原市（歴史的町名）', url: 'https://www.city.odawara.kanagawa.jp/field/lifelong/property/topics/tyoumeihi.html' }, { label: '0465.net', url: 'https://www.0465.net/map/index.html?i=802' }] },
    { lat: 35.2491008040028, lng: 139.16004770569708, name: '松原神社', label: '松原神社', color: '#0f766e', tooltipDirection: null,
      description: '小田原総鎮守。創建は近衛天皇久安年間（1145〜1150年）の勧請との伝承があり、かつては鶴の森明神・松原大明神と称された。北条氏・稲葉氏・大久保氏が崇敬し、江戸時代には小田原宿十九町の総鎮守として藩財で社費を賄った。明治2年（1869年）に松原神社と改称、県社。小田原三大明神の一社。',
      sources: [{ label: '松原神社公式', url: 'https://odawaramatsubarajinja.com/' }, { label: '神奈川県神社庁', url: 'https://www.kanagawa-jinja.or.jp/shrine/1210143-000/' }, { label: '観光かながわNOW', url: 'https://www.kanagawa-kankou.or.jp/spot/1158' }] },
    { lat: 35.25014734289875, lng: 139.1528205329637, name: '報徳二宮神社', label: '報徳二宮神社', color: '#78350f', tooltipDirection: 'bottom',
      description: '二宮尊徳を御祭神とする神社。明治27年（1894年）、旧小田原城二の丸小峰曲輪の一角に、伊豆・三河・遠江・駿河・甲斐・相模の6カ国報徳社の総意により創建。明治42年（1909年）に本殿・幣殿を新築し現在の景観に。拝殿の礎石は天保の大飢饉の際、尊徳が領民救済のため城内米蔵を開いた時の礎石が用いられている。神社本庁別表神社、社殿は神明造り。',
      sources: [{ label: '報徳二宮神社公式', url: 'https://www.ninomiya.or.jp/info/' }, { label: '御祭神・二宮尊徳翁', url: 'https://www.ninomiya.or.jp/sontoku/' }, { label: 'Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E5%A0%B1%E5%BE%B3%E4%BA%8C%E5%AE%AE%E7%A5%9E%E7%A4%BE_(%E5%B0%8F%E7%94%B0%E5%8E%9F%E5%B8%82)' }] },
    { lat: 35.24754510670632, lng: 139.15604991263515, name: 'ういろう本店', label: 'ういろう本店', color: '#ca8a04', tooltipDirection: 'bottom',
      description: '室町時代から続く外郎（ういろう）家の老舗。家伝薬「透頂香」の製作者である外郎家が賓客接待用に考案した蒸し菓子を製造・販売。1368年（応安元年）に元朝から渡来した陳延祐が起源で、北条早雲の招きにより1504年頃に小田原に移住し、現在も25代続く。米粉・砂糖・水を主原料にした白・緑・紅などの棹物が名物で、江戸時代には東海道の名物として『東海道名所記』やケンペル『日本誌』に記された。全国のういろう文化の源流。',
      sources: [{ label: 'ういろう本店（歴史）', url: 'https://www.uirou.co.jp/history/' }, { label: 'ちえのともしび', url: 'https://chienotomoshibi.jp/uirou/' }, { label: 'Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E3%81%86%E3%81%84%E3%82%8D%E3%81%86_(%E4%BC%81%E6%A5%AD)' }] },
    { lat: 35.24658639198841, lng: 139.1566450193041, name: '茶畑町（ちゃばたけちょう）', label: '茶畑町', color: '#065f46', tooltipDirection: null,
      description: '小田原城下の江戸時代の町人地。東海道筋の脇道に位置し、この地域でかつて茶の栽培が行われていたことに由来する町名とされる。城下町・宿場町として発展するなかで生まれた歴史的町名の一つで、小田原市では町名碑などで過去の地名を伝えている。',
      sources: [{ label: 'ツナガルマップ（小田原の町名）', url: 'https://www.tsunagaru-map.com/odawara-names-basic/map.html?point=920' }, { label: '小田原市（町名・地名）', url: 'https://www.city.odawara.kanagawa.jp/about/introduction/history/timei.html' }] },
    { lat: 35.2510456834545, lng: 139.15344468712, name: '小田原城', label: '小田原城', color: '#374151', tooltipDirection: 'bottom',
      description: '戦国時代から続く小田原のシンボル。北条氏の本拠として難攻不落の城下町を形成し、のち稲葉氏などが城主を務めた。復興天守や常盤木門・馬出門などが整備され、城址公園として歴史・観光の中心となっている。',
      sources: [{ label: '小田原城公式', url: 'https://www.city.odawara.kanagawa.jp/encycl/odawara-castle/' }] },
    { lat: 35.256164102368004, lng: 139.15576140682765, name: '小田原駅', label: '小田原駅', color: '#059669', tooltipDirection: null,
      description: 'JR東海道本線・東海道新幹線・小田急小田原線が乗り入れる城下町の玄関口。1920年開業。南町・諸白小路周辺へは徒歩15〜20分で、豆相人車鉄道の旧駅跡（早川口付近）は南東に位置する。',
      sources: [{ label: 'JR東日本', url: 'https://www.jreast.co.jp/station/stations/878.html' }] },
    { lat: 35.243452421280864, lng: 139.15786012531294, name: '荒久の灯台', label: '荒久の灯台', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原市南町付近、荒久地区に立つ灯台。地域のランドマークとして親しまれている。',
      sources: [] },
    { lat: 35.25355017061354, lng: 139.14328952727084, name: '小峰御鐘ノ台大堀切東堀', label: '小峰御鐘ノ台大堀切東堀', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城総構の北西・城山丘陵にある小峰御鐘ノ台大堀切の「東堀」。後北条氏が八幡山〜小峰の尾根を断ち切る形で築いた三重空堀（東・中・西）のうち、現存規模が最大で、堀底に遊歩道が整備された空堀散策ルート。長さ約220〜280m・幅約20〜30m・深さは土塁頂から約12〜15m（見える深さ8〜10m）。法面は50〜60度の急斜面で関東ロームの滑りやすい土質とあわせ敵の登攀を防ぐ。発掘で堀障子・土橋状部分・横矢掛かりが確認され、天正期総構の代表的遺構。小田原駅西口から徒歩約20分、箱根板橋駅から徒歩約11分。南端から北端まで堀底を歩いて体感できる。',
      sources: [
        { label: '小田原観光', url: 'https://www.odawara-kankou.com/spot/spot_area/oohorikiri.html' },
        { label: '小田原市（城の回廊）', url: 'https://www.city.odawara.kanagawa.jp/kanko/corridor/castle/p10002.html' },
        { label: 'his-trip', url: 'https://www.his-trip.info/siseki/entry2479.html' },
        { label: 'じゃらん', url: 'https://www.jalan.net/kankou/spt_14206af2172086035/' }
      ] },
    { lat: 35.243452421280864, lng: 139.15786012531294, name: '荒久の灯台', label: '荒久の灯台', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原の海辺・荒久地区に立つ灯台。漁港や海岸の目印として親しまれている。',
      sources: [] },
    { lat: 35.24701461701089, lng: 139.16100646635766, name: '海へと続くトンネル', label: '海へと続くトンネル', color: '#1d4ed8', tooltipDirection: null,
      description: '海へと続くトンネル。かまぼこ通り方面から海側へ抜ける通路として知られる。',
      sources: [] },
    { lat: 35.24518150663211, lng: 139.15930097306406, name: '御幸の浜', label: '御幸の浜', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原の海岸にある御幸の浜。海に面した砂浜・海岸のスポットである。',
      sources: [] },
    { lat: 35.24716670727812, lng: 139.14817605993196, name: '居神神社', label: '居神神社', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原に鎮座する居神神社。地域の氏神として信仰されている。',
      sources: [] },
    { lat: 35.24744174648453, lng: 139.15471594266543, name: '柳屋ベーカリー', label: '柳屋ベーカリー', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原・南町周辺のパン屋「柳屋ベーカリー」。',
      sources: [] },
    { lat: 35.24808590827724, lng: 139.16061944570703, name: '籠清本店', label: '籠清本店', color: '#1d4ed8', tooltipDirection: null,
      description: 'かまぼこ通り周辺の老舗「籠清本店」。',
      sources: [] },
    { lat: 35.245096952753364, lng: 139.1569404333824, name: '滄浪閣旧址', label: '滄浪閣旧址', color: '#1d4ed8', tooltipDirection: null,
      description: '初代内閣総理大臣・伊藤博文の別邸「滄浪閣」の旧址。小田原の南町付近にあった別荘の跡地である。',
      sources: [] },
    { lat: 35.253365328262646, lng: 139.15005064295596, name: '八幡山古郭跡', label: '八幡山古郭跡', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城総構の北西、八幡山の古郭（曲輪）の跡。城の防御遺構の一つである。',
      sources: [] },
    { lat: 35.25212190749775, lng: 139.1517216851566, name: '小田原城 八幡山古郭東曲輪跡', label: '小田原城 八幡山古郭東曲輪跡', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城・八幡山古郭の東曲輪の跡。総構の北西側に位置する曲輪遺構である。',
      sources: [] },
    { lat: 35.249190242807416, lng: 139.14147358637595, name: '松永記念館（小田原市郷土文化館分館）', label: '松永記念館', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原市郷土文化館の分館。松永記念館として、小田原の歴史・文化に関する資料を展示している。',
      sources: [] },
    { lat: 35.248753583172665, lng: 139.14431719133296, name: '古稀庵（山縣有朋公爵別邸跡）', label: '古稀庵', color: '#1d4ed8', tooltipDirection: null,
      description: '山縣有朋公爵の別邸跡「古稀庵」。明治・大正期の政治家・山縣有朋ゆかりの地である。',
      sources: [] },
    { lat: 35.249898155703065, lng: 139.14380680069968, name: '皆春荘（旧山縣有朋・清浦奎吾別邸）', label: '皆春荘', color: '#1d4ed8', tooltipDirection: null,
      description: '旧山縣有朋・清浦奎吾別邸「皆春荘」。明治・大正期の政治家ゆかりの別邸である。',
      sources: [] },
    { lat: 35.250771460318745, lng: 139.1457106387132, name: '小田原城 三の丸外郭新堀土塁', label: '小田原城 三の丸外郭新堀土塁', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城三の丸外郭の新堀に伴う土塁。城の防御遺構の一つである。',
      sources: [] },
    { lat: 35.244611419808315, lng: 139.14921957726818, name: '小田原城跡 早川口遺構', label: '小田原城跡 早川口遺構', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城跡の早川口に残る遺構。城の虎口・出入口に関連する遺構である。',
      sources: [] }
  ];
  var labelHalfH = 0.000065, labelHalfW = 0.00013;
  var labelMargin = 2.0;
  function labelBox(lat, lng, margin) {
    var m = (margin != null) ? margin : 1;
    return { minLat: lat - labelHalfH * m, maxLat: lat + labelHalfH * m, minLng: lng - labelHalfW * m, maxLng: lng + labelHalfW * m };
  }
  function boxesOverlap(a, b) {
    return !(a.maxLat < b.minLat || a.minLat > b.maxLat || a.maxLng < b.minLng || a.minLng > b.maxLng);
  }
  function pointAlongLine(latlngs, t) {
    if (latlngs.length < 2) return latlngs[0];
    t = Math.max(0, Math.min(1, t));
    var total = 0, segLengths = [];
    for (var i = 0; i < latlngs.length - 1; i++) {
      var a = latlngs[i], b = latlngs[i + 1];
      var d = (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]);
      segLengths.push(Math.sqrt(d));
      total += segLengths[i];
    }
    if (total <= 0) return latlngs[0];
    var target = t * total, acc = 0;
    for (var j = 0; j < segLengths.length; j++) {
      if (acc + segLengths[j] >= target) {
        var u = (target - acc) / segLengths[j];
        return [latlngs[j][0] + u * (latlngs[j + 1][0] - latlngs[j][0]), latlngs[j][1] + u * (latlngs[j + 1][1] - latlngs[j][1])];
      }
      acc += segLengths[j];
    }
    return latlngs[latlngs.length - 1];
  }
  function labelOffsetFromLine(latlngs, pointOnLine, offsetDist, sign) {
    if (latlngs.length < 2) return pointOnLine;
    var a = latlngs[0], b = latlngs[latlngs.length - 1];
    var dlat = b[0] - a[0], dlng = b[1] - a[1];
    var len = Math.sqrt(dlat * dlat + dlng * dlng);
    if (len < 1e-10) return pointOnLine;
    var mult = (sign === -1) ? -1 : 1;
    var perpLat = (-dlng / len) * offsetDist * mult, perpLng = (dlat / len) * offsetDist * mult;
    return [pointOnLine[0] + perpLat, pointOnLine[1] + perpLng];
  }
  var streetDefs = [
    { name: '諸白小路', color: '#9f1239', latlngs: [[35.2451645, 139.1528766], [35.2470533, 139.1528730]], t: 0.72, sign: 1,
      description: '小田原城下町の南西部にあった武家地の小路。「貞享三年御引渡記録」（1686年）に登場。城主・稲葉正則の時代に京都・大阪から杜氏を招いて諸白酒を造らせたことにちなむ地名で、道の両側に中級武士の屋敷が並んでいた。',
      sources: [{ label: '小田原市（歴史的町名）', url: 'https://www.city.odawara.kanagawa.jp/field/lifelong/property/topics/tyoumeihi.html' }, { label: '0465.net', url: 'https://www.0465.net/map/index.html?i=802' }] },
    { name: '西海子小路', color: '#1e40af', latlngs: [[35.2452411, 139.1552844], [35.2452028, 139.1541285], [35.2451810, 139.1534154], [35.2451645, 139.1528766], [35.2451313, 139.1517373], [35.2451302, 139.1516921], [35.2451055, 139.1506258]], t: 0.07, sign: 1, fixedLabelPos: [35.24485, 139.1520],
      description: 'サイカチの木に由来する通り名。江戸時代末期には中級藩士の武家屋敷が道の両側に十八軒並んだとされる。藩主稲葉家時代の史料「永代日記」にも地名が見られ、現在は小田原文学館・白秋童謡館へのアプローチとして桜並木で知られる。',
      sources: [{ label: 'けまあけ（南町の小路）', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: '狩野殿小路', color: '#166534', latlngs: [[35.2452028, 139.1541285], [35.2456318, 139.1541255], [35.2458355, 139.1541241], [35.2472226, 139.1541146]], t: 0.52, sign: 1,
      description: '諸白小路の西側に並行して走る武家地の小路。小田原北条氏の家臣・狩野氏の宅跡に由来し、絵師・狩野古法眼（狩野元信）の居住伝承がある。「貞享三年御引渡記録」（1686年）に初出。狩野小路・金殿小路とも表記された。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }, { label: '0465.net', url: 'https://www.0465.net/map/index.html?i=802' }] },
    { name: '安斎小路', color: '#9a3412', latlngs: [[35.2472744, 139.1552767], [35.2472004, 139.1552755], [35.2463722, 139.1552745], [35.2459051, 139.1552824], [35.2453009, 139.1552865], [35.2452411, 139.1552844], [35.2444518, 139.1553157], [35.2443969, 139.1553179], [35.2443687, 139.1553190]], t: 0.18, sign: -1, fixedLabelPos: [35.24705, 139.15482],
      description: '諸白小路の東側に位置する武家地の小路。小田原北条氏の侍医・田村安斎（栖）の宅があったことに由来。「貞享三年御引渡記録」（1686年）に記され、北条氏政・氏照兄弟が豊臣秀吉の小田原攻め後にこの地で自害したという伝承もある。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: '天神小路', color: '#5b21b6', latlngs: [[35.2451302, 139.1516921], [35.2454581, 139.1516920], [35.2457604, 139.1516945], [35.2463797, 139.1516970], [35.2468830, 139.1516993]], t: 0.78, sign: -1,
      description: '「貞享三年御引渡記録」に「御花畑小路」として初出し、「東海道分間延絵図」（1789〜1806年）頃から天神小路と呼ばれる。東海道を隔てた北方の天神社に由来し、道の両側は中級藩士の武家地だった。御花畑小路の名は一部区間に残る。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: '御厩小路', color: '#ca8a04', latlngs: [[35.2421129, 139.1500686], [35.2423468, 139.1502691], [35.2425018, 139.1504101], [35.2425894, 139.1504819], [35.2426728, 139.1505319], [35.2428393, 139.1505918], [35.2428980, 139.1506099], [35.2429481, 139.1506186], [35.2431266, 139.1506429], [35.2432057, 139.1506531], [35.2433674, 139.1506657], [35.2437264, 139.1506754], [35.2442198, 139.1506565], [35.2447749, 139.1506362], [35.2449489, 139.1506299], [35.2451055, 139.1506258], [35.2453443, 139.1506197], [35.2454405, 139.1506168], [35.2461292, 139.1505897], [35.2466355, 139.1505772], [35.2467289, 139.1505661]], fixedLabelPos: [35.24562, 139.15005],
      description: '「寛文九年火災報告に関する文書」（1669年）に初出。西海子小路との交差点西側に小田原藩の馬屋（御厩）があったことに由来。承応2年（1653年）に藩主・稲葉正則が馬を見に来た記録が残り、熱海街道の起点でもあった。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: 'かまぼこ通り', color: '#0e7490', latlngs: [[35.2470681, 139.1579610], [35.2472306, 139.1584984], [35.2473296, 139.1588290], [35.2474477, 139.1591730], [35.2476156, 139.1596641], [35.2478525, 139.1603293], [35.2479805, 139.1606989], [35.2480026, 139.1607628], [35.2481470, 139.1611287], [35.2482300, 139.1612852], [35.2482585, 139.1613357], [35.2484002, 139.1616404], [35.2486005, 139.1620756], [35.2486098, 139.1620976], [35.2487989, 139.1625105]], t: 0.5, sign: 1,
      description: '旧東海道小田原筋の一部。蒲鉾屋・干物屋など約30店舗が並ぶ漁師町風情の通りで、鈴廣かまぼこ博物館なども立地。小田原城下から海側へ向かう歴史ある街道の面影を残す観光・食のスポットである。',
      sources: [{ label: '小田原市観光', url: 'https://www.city.odawara.kanagawa.jp/kanko/' }] }
  ];
  var streetOffset = 0.00018;
  streetDefs.forEach(function (s) {
    if (s.fixedLabelPos) {
      s.labelPos = s.fixedLabelPos;
    } else {
      s.onLine = pointAlongLine(s.latlngs, s.t);
      s.labelPos = labelOffsetFromLine(s.latlngs, s.onLine, streetOffset, s.sign);
    }
  });
  var labelShiftLeftLng = 0.001;
  var labelShiftLeftNames = ['御厩小路', '天神小路', '諸白小路', '狩野殿小路', '西海子小路'];
  streetDefs.forEach(function (s) {
    if (labelShiftLeftNames.indexOf(s.name) !== -1 && s.labelPos) {
      s.labelPos = [s.labelPos[0], s.labelPos[1] - labelShiftLeftLng];
    }
  });
  streetDefs.forEach(function (s) {
    if (s.name === '狩野殿小路' && s.labelPos) {
      s.labelPos = [s.labelPos[0] + 0.000135, s.labelPos[1] + 0.000165];
    }
  });
  streetDefs.forEach(function (s) {
    if (s.name === '諸白小路' && s.labelPos) {
      s.labelPos = [s.labelPos[0] + 0.000135, s.labelPos[1] + 0.000055];
    }
    if (s.name === '天神小路' && s.labelPos) {
      s.labelPos = [s.labelPos[0] - 0.00027, s.labelPos[1] + 0.00033];
    }
    if (s.name === '御厩小路' && s.labelPos) {
      s.labelPos = [s.labelPos[0] + 0.00027, s.labelPos[1] + 0.00033];
    }
    if (s.name === '西海子小路' && s.labelPos) {
      s.labelPos = [s.labelPos[0] + 0.000135, s.labelPos[1] + 0.000165];
    }
  });
  var tooltipPanel = document.getElementById('spots-map-tooltip-panel');
  var tooltipHideTimeout;
  var currentTooltipHtml = null;
  function getLat(latLngOrArr) {
    if (!latLngOrArr) return null;
    return typeof latLngOrArr.lat === 'number' ? latLngOrArr.lat : latLngOrArr[0];
  }
  function showTooltipPanel(html, markerLat) {
    if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
    tooltipHideTimeout = null;
    if (tooltipPanel) {
      var isFullscreen = document.body.classList.contains('fullscreen-map');
      var atTop = isFullscreen && markerLat != null && (function () {
        var center = map.getCenter();
        return center && markerLat < center.lat;
      })();
      if (atTop) tooltipPanel.classList.add('at-top');
      else tooltipPanel.classList.remove('at-top');
      tooltipPanel.innerHTML = '<button type="button" class="spots-tooltip-close" aria-label="閉じる" title="閉じる">×</button><div class="spots-tooltip-body">' + html + '</div>';
      tooltipPanel.style.display = 'block';
      currentTooltipHtml = html;
    }
  }
  function hideTooltipPanel(delay) {
    if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
    tooltipHideTimeout = setTimeout(function () {
      tooltipHideTimeout = null;
      currentTooltipHtml = null;
      if (tooltipPanel) tooltipPanel.style.display = 'none';
    }, delay || 0);
  }
  if (tooltipPanel) {
    tooltipPanel.addEventListener('mouseenter', function () { if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout); tooltipHideTimeout = null; });
    tooltipPanel.addEventListener('mouseleave', function () { hideTooltipPanel(200); });
    tooltipPanel.addEventListener('click', function (e) {
      if (e.target.classList.contains('spots-tooltip-close')) {
        if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
        tooltipHideTimeout = null;
        currentTooltipHtml = null;
        tooltipPanel.style.display = 'none';
      }
    });
  }
  var spotMarkerColor = '#1d4ed8';
  spots.forEach(function (s) {
    var isStar = s.shape === 'star';
    var iconHtml = isStar
      ? '<span class="spot-marker spot-marker-star" style="color:' + (s.color || spotMarkerColor) + '">★</span>'
      : '<span class="spot-marker" style="background-color:' + spotMarkerColor + '"></span>';
    var icon = L.divIcon({
      className: 'spot-marker-wrap',
      html: iconHtml,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    var tooltipHtml = buildTooltipHtml(s.label || s.name, s.description, s.sources);
    var marker = L.marker([s.lat, s.lng], { icon: icon }).addTo(map);
    marker.on('click', function () {
      if (tooltipPanel && tooltipPanel.style.display === 'block' && currentTooltipHtml === tooltipHtml) {
        if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
        tooltipHideTimeout = null;
        currentTooltipHtml = null;
        tooltipPanel.style.display = 'none';
      } else {
        showTooltipPanel(tooltipHtml, s.lat);
      }
    });
  });

  var route1Latlngs = [
    [35.23308, 139.0936], [35.233, 139.0939], [35.23297, 139.0949], [35.23283, 139.0951],
    [35.23271, 139.0956], [35.2328, 139.0959], [35.23299, 139.0962], [35.23288, 139.0969],
    [35.23269, 139.0973], [35.23266, 139.0976], [35.23209, 139.0992], [35.23207, 139.0993],
    [35.23207, 139.0997], [35.2319, 139.1001], [35.23182, 139.1002], [35.23171, 139.1003],
    [35.23166, 139.1005], [35.23165, 139.1006], [35.23165, 139.1007], [35.23165, 139.1008],
    [35.23183, 139.1018], [35.23189, 139.1021], [35.23192, 139.1021], [35.23195, 139.1022],
    [35.23207, 139.1024], [35.23239, 139.1028], [35.2325, 139.103], [35.23264, 139.1032],
    [35.23288, 139.1034], [35.23321, 139.1038], [35.23329, 139.1039], [35.23335, 139.104],
    [35.23344, 139.1041], [35.23351, 139.1042], [35.23353, 139.1043], [35.23356, 139.1044],
    [35.23358, 139.1045], [35.23362, 139.1047], [35.23366, 139.1048], [35.23371, 139.105],
    [35.23379, 139.1053], [35.23384, 139.1056], [35.23387, 139.1058], [35.2339, 139.1061],
    [35.23402, 139.1073], [35.23403, 139.1075], [35.23403, 139.1077], [35.23402, 139.1079],
    [35.23393, 139.1083], [35.23392, 139.1084], [35.23386, 139.1086], [35.23381, 139.1087],
    [35.23377, 139.1088], [35.23368, 139.1091], [35.23365, 139.1094], [35.23363, 139.1097],
    [35.23364, 139.1101], [35.23365, 139.1102], [35.23367, 139.1104], [35.2339, 139.1114],
    [35.23392, 139.1115], [35.23399, 139.1118], [35.23405, 139.112], [35.23412, 139.1122],
    [35.23426, 139.1124], [35.23449, 139.1129], [35.2347, 139.1133], [35.23498, 139.1139],
    [35.23509, 139.1141], [35.23518, 139.1142], [35.23525, 139.1143], [35.23532, 139.1144],
    [35.23541, 139.1145], [35.23561, 139.1147], [35.23641, 139.1153], [35.23685, 139.1157],
    [35.23703, 139.1159], [35.23716, 139.1161], [35.23733, 139.1164], [35.23739, 139.1164],
    [35.23788, 139.1172], [35.2382, 139.1176], [35.23832, 139.1177], [35.23879, 139.1183],
    [35.23906, 139.1187], [35.2392, 139.1189], [35.24027, 139.1208], [35.2409, 139.1218],
    [35.241, 139.122], [35.24195, 139.1236], [35.24219, 139.124], [35.24227, 139.1241],
    [35.24233, 139.1242], [35.24239, 139.1243], [35.24274, 139.1249], [35.24339, 139.126],
    [35.24361, 139.1264], [35.24379, 139.1267], [35.24395, 139.127], [35.24432, 139.1276],
    [35.2444, 139.1277], [35.24444, 139.1278], [35.24467, 139.1282], [35.24483, 139.1285],
    [35.24492, 139.1287], [35.2451, 139.129], [35.24538, 139.1294], [35.24554, 139.1297],
    [35.24574, 139.13], [35.24633, 139.1311], [35.24638, 139.1311], [35.24641, 139.1312],
    [35.24648, 139.1313], [35.24659, 139.1315], [35.24676, 139.1319], [35.2469, 139.1324],
    [35.24692, 139.1327], [35.24691, 139.133], [35.24689, 139.1332], [35.24652, 139.135],
    [35.24649, 139.1351], [35.2465, 139.1353], [35.24659, 139.1361], [35.24663, 139.1366],
    [35.24661, 139.1375], [35.24662, 139.1377], [35.24664, 139.1379], [35.24684, 139.1393],
    [35.24686, 139.1395], [35.24686, 139.1398], [35.24686, 139.1399], [35.24683, 139.1401],
    [35.24679, 139.1403], [35.24677, 139.1403], [35.24662, 139.1409], [35.24638, 139.1418],
    [35.24631, 139.142], [35.24605, 139.1429], [35.24592, 139.1434], [35.24586, 139.1437],
    [35.24584, 139.1438], [35.24582, 139.1438], [35.24578, 139.1441], [35.24574, 139.1446],
    [35.24573, 139.1449], [35.24573, 139.1451], [35.24575, 139.1454], [35.24577, 139.1458],
    [35.24589, 139.1464], [35.24592, 139.1466], [35.24593, 139.1466], [35.24596, 139.1468],
    [35.24597, 139.1468], [35.24607, 139.1473], [35.24614, 139.1476], [35.24626, 139.1482],
    [35.24631, 139.1484], [35.24648, 139.1491], [35.24653, 139.1494], [35.24655, 139.1495],
    [35.2466, 139.1498], [35.24673, 139.1506], [35.24688, 139.1517], [35.2469, 139.1518],
    [35.24705, 139.1529], [35.24722, 139.1541], [35.24727, 139.1552], [35.24727, 139.1553],
    [35.24728, 139.1553], [35.24729, 139.1558], [35.24729, 139.1561], [35.24731, 139.1564],
    [35.24734, 139.1566], [35.24744, 139.1571], [35.24761, 139.1576], [35.24765, 139.1577],
    [35.2477, 139.1578], [35.2478324, 139.1582465], [35.2482142, 139.1593832], [35.2483249, 139.1596748],
    [35.2483424, 139.1597117], [35.2483808, 139.1597422], [35.2484552, 139.1597378], [35.2487462, 139.1596315],
    [35.2487862, 139.1596169], [35.2492996, 139.1594294], [35.2495646, 139.1593751], [35.2496238, 139.1593677],
    [35.2502016, 139.1593343], [35.2505895, 139.1593067], [35.25061, 139.1598], [35.25063, 139.1601],
    [35.25066, 139.1607], [35.25067, 139.1609], [35.25069, 139.1612], [35.25071, 139.1615],
    [35.25071, 139.1616], [35.25072, 139.1617], [35.25075, 139.1623], [35.25076, 139.1624],
    [35.25077, 139.1625], [35.25079, 139.1628], [35.25081, 139.1629], [35.25086, 139.1631],
    [35.25091, 139.1632], [35.25097, 139.1633], [35.25127, 139.1636], [35.25143, 139.1638],
    [35.25154, 139.1639], [35.25208, 139.1645], [35.25234, 139.1648], [35.25253, 139.165],
    [35.25264, 139.1651], [35.25272, 139.1651], [35.25283, 139.1652], [35.25294, 139.1654],
    [35.25349, 139.1662], [35.25383, 139.1667], [35.2545, 139.1677], [35.25463, 139.1679],
    [35.25473, 139.1681], [35.25486, 139.1683], [35.25501, 139.1686], [35.25521, 139.169],
    [35.25525, 139.169], [35.2553, 139.1691], [35.25552, 139.1695], [35.25583, 139.1701],
    [35.25596, 139.1704], [35.25597, 139.1704], [35.25637, 139.1719], [35.25639, 139.172],
    [35.2564, 139.172], [35.25652, 139.1723], [35.25664, 139.1726], [35.25688, 139.1731],
    [35.25689, 139.1731], [35.25725, 139.1738], [35.25736, 139.1741], [35.25751, 139.1744],
    [35.25754, 139.1744], [35.25757, 139.1745], [35.2577, 139.1747], [35.25798, 139.1752],
    [35.25815, 139.1754], [35.25816, 139.1754], [35.25865, 139.1762], [35.25889, 139.1765],
    [35.25911, 139.1768], [35.25923, 139.177], [35.25966, 139.1775], [35.25982, 139.1776],
    [35.26031, 139.1782], [35.26044, 139.1783], [35.26087, 139.1788], [35.26114, 139.1791],
    [35.26163, 139.1796], [35.26201, 139.18], [35.2626, 139.1805], [35.26438, 139.1825],
    [35.26451, 139.1827], [35.26456, 139.1827], [35.26462, 139.1828], [35.26473, 139.183],
    [35.26476, 139.1831], [35.26487, 139.1834], [35.26498, 139.1837], [35.265, 139.1837],
    [35.26502, 139.1838], [35.2652, 139.1844], [35.26524, 139.1846], [35.2653, 139.1848],
    [35.26533, 139.1848], [35.27839, 139.2049], [35.27849, 139.2051], [35.27859, 139.2053],
    [35.27935, 139.2076], [35.28015, 139.2126], [35.28028, 139.2135]
  ];
  var route1LayerGroup = L.layerGroup();
  L.polyline(route1Latlngs, {
    color: 'rgba(0,0,0,0.08)',
    weight: 18,
    opacity: 1,
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(route1LayerGroup);
  L.polyline(route1Latlngs, {
    color: 'rgba(29, 78, 216, 0.6)',
    weight: 10,
    opacity: 1,
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(route1LayerGroup).bindPopup('国道1号', { className: 'street-popup' });
  route1LayerGroup.addTo(map);
  // 画像で示された旧東海道（国道1号より北の住宅地を通る板橋旧道）＝ OSM way 49577381
  var itabashiTokaidoLatlngs = [
    [35.2469569, 139.1403556], [35.2469761, 139.1405328], [35.2470418, 139.1408224], [35.2470762, 139.1408885],
    [35.2471339, 139.1409579], [35.2471781, 139.1410068], [35.2472554, 139.1411349], [35.2473260, 139.1412606],
    [35.2475637, 139.1417680], [35.2475861, 139.1418480], [35.2475894, 139.1419074], [35.2475858, 139.1420154],
    [35.2475172, 139.1424358], [35.2473935, 139.1431133], [35.2473449, 139.1434086], [35.2472278, 139.1440737],
    [35.2469457, 139.1456669], [35.2468502, 139.1461512], [35.2467331, 139.1465699], [35.2465367, 139.1472357],
    [35.2465319, 139.1472518], [35.2464643, 139.1474430], [35.2464009, 139.1474974], [35.2462967, 139.1475609],
    [35.2462282, 139.1476006], [35.2461431, 139.1476499]
  ];
  var tokaidoLayerGroup = L.layerGroup();
  L.polyline(itabashiTokaidoLatlngs, {
    color: 'rgba(100, 116, 139, 0.6)',
    weight: 10,
    opacity: 1,
    dashArray: '10,8',
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(tokaidoLayerGroup);
  // 本町〜新宿の旧東海道（指定通過点）
  var honmachiShinjukuTokaidoLatlngs = [
    [35.248379423847965, 139.15977642201545],
    [35.24879573511963, 139.16100306983805],
    [35.249160005728776, 139.16204651701182],
    [35.249390926428, 139.1625682405987],
    [35.250721146995744, 139.16431262930286],
    [35.25197329061948, 139.1659255915371],
    [35.25266927898125, 139.16508525812645]
  ];
  L.polyline(honmachiShinjukuTokaidoLatlngs, {
    color: 'rgba(100, 116, 139, 0.6)',
    weight: 10,
    opacity: 1,
    dashArray: '10,8',
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(tokaidoLayerGroup);
  tokaidoLayerGroup.addTo(map);
  // かまぼこ通り（指定通過点）
  var kamabokoDoriLatlngs = [
    [35.2488175314471, 139.16249881467414],
    [35.249168792327026, 139.1631878084051],
    [35.24953631365383, 139.1637453755972],
    [35.250284360774515, 139.164665361451],
    [35.25105516733104, 139.16562119090548],
    [35.25152024960176, 139.1661867233238],
    [35.251621071277974, 139.16633408036745]
  ];
  L.polyline(kamabokoDoriLatlngs, {
    color: '#0e7490',
    weight: 4,
    opacity: 0.92,
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);
  // かまぼこ通り（指定通過点・2本目）
  var kamabokoDoriLatlngs2 = [
    [35.25196779160646, 139.1659100670894],
    [35.24987003339279, 139.16320586623146],
    [35.249557804262565, 139.1627797256057],
    [35.249362660454416, 139.16245315053607],
    [35.24886178918576, 139.16118269388346],
    [35.248442225801796, 139.15999587232],
    [35.248038922517544, 139.15886082484965]
  ];
  L.polyline(kamabokoDoriLatlngs2, {
    color: '#0e7490',
    weight: 4,
    opacity: 0.92,
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);
  // かまぼこ通り（指定通過点・3本目）
  var kamabokoDoriLatlngs3 = [
    [35.24845890726257, 139.16005313417844],
    [35.24787085094587, 139.16032671884054],
    [35.247538391677125, 139.16052369979008],
    [35.247166607662265, 139.1608410579936]
  ];
  L.polyline(kamabokoDoriLatlngs3, {
    color: '#0e7490',
    weight: 4,
    opacity: 0.92,
    lineCap: 'round',
    lineJoin: 'round'
  }).addTo(map);
  var initialBounds = L.latLngBounds(
    [[35.24505, 139.140], [35.252, 139.166]]
  );
  map.fitBounds(initialBounds, { padding: [24, 24], maxZoom: 18 });

  streetDefs.forEach(function (s) {
    if (s.showLine === false) {
      var labelIcon = L.divIcon({
        className: 'street-label-wrap',
        html: '<span class="street-label" style="background-color:' + s.color + '">' + s.name + '</span>',
        iconSize: null,
        iconAnchor: [0, 0]
      });
      var streetTooltipHtml = buildTooltipHtml(s.name, s.description, s.sources);
      var streetMarker = L.marker(s.labelPos, { icon: labelIcon, zIndexOffset: 600 }).addTo(map);
      streetMarker.on('click', function () {
        if (tooltipPanel && tooltipPanel.style.display === 'block' && currentTooltipHtml === streetTooltipHtml) {
          if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
          tooltipHideTimeout = null;
          currentTooltipHtml = null;
          tooltipPanel.style.display = 'none';
        } else {
          showTooltipPanel(streetTooltipHtml, getLat(s.labelPos));
        }
      });
      return;
    }
    L.polyline(s.latlngs, {
      color: 'rgba(0,0,0,0.12)',
      weight: 8,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);
    L.polyline(s.latlngs, {
      color: s.color,
      weight: 4,
      opacity: 0.92,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map).bindPopup(s.name, { className: 'street-popup' });
    var labelIcon = L.divIcon({
      className: 'street-label-wrap',
      html: '<span class="street-label" style="background-color:' + s.color + '">' + s.name + '</span>',
      iconSize: null,
      iconAnchor: [0, 0]
    });
    var streetTooltipHtml = buildTooltipHtml(s.name, s.description, s.sources);
    var streetMarker = L.marker(s.labelPos, { icon: labelIcon, zIndexOffset: 600 }).addTo(map);
    streetMarker.on('click', function () {
      if (tooltipPanel && tooltipPanel.style.display === 'block' && currentTooltipHtml === streetTooltipHtml) {
        if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
        tooltipHideTimeout = null;
        currentTooltipHtml = null;
        tooltipPanel.style.display = 'none';
      } else {
        showTooltipPanel(streetTooltipHtml, getLat(s.labelPos));
      }
    });
  });
  var route1LabelPos = labelOffsetFromLine(route1Latlngs, pointAlongLine(route1Latlngs, 0.36), 0.00022, 1);
  var route1LabelIcon = L.divIcon({
    className: 'street-label-wrap',
    html: '<span class="street-label" style="background-color:#1d4ed8">国道1号</span>',
    iconSize: null,
    iconAnchor: [0, 0]
  });
  var route1Description = '東海道の現道で、箱根湯本〜小田原〜国府津を結ぶ。小田原城下の北側を通り、江戸時代の東海道にほぼ沿うルート。南町の諸白小路・西海子小路などはこの国道1号（旧東海道）の南側に並行して延びる武家地の小路であった。';
  var route1Sources = [{ label: '国土交通省（国道の番号）', url: 'https://www.mlit.go.jp/road/road_e/route.html' }];
  var route1TooltipHtml = buildTooltipHtml('国道1号', route1Description, route1Sources);
  var route1Marker = L.marker(route1LabelPos, { icon: route1LabelIcon }).addTo(route1LayerGroup);
  route1Marker.on('click', function () {
    if (tooltipPanel && tooltipPanel.style.display === 'block' && currentTooltipHtml === route1TooltipHtml) {
      if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout);
      tooltipHideTimeout = null;
      currentTooltipHtml = null;
      tooltipPanel.style.display = 'none';
    } else {
      showTooltipPanel(route1TooltipHtml, getLat(route1LabelPos));
    }
  });
  var toggleRoute1 = document.getElementById('toggle-route1');
  var toggleTokaido = document.getElementById('toggle-tokaido');
  if (toggleRoute1) {
    toggleRoute1.addEventListener('change', function () {
      if (this.checked) map.addLayer(route1LayerGroup);
      else map.removeLayer(route1LayerGroup);
    });
  }
  if (toggleTokaido) {
    toggleTokaido.addEventListener('change', function () {
      if (this.checked) map.addLayer(tokaidoLayerGroup);
      else map.removeLayer(tokaidoLayerGroup);
    });
  }
})();