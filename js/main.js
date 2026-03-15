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
      description: '大正12年（1923年）頃、貴族院議員・松本剛吉が建てた別邸である。松本剛吉は明治期に外務省で条約改正に携わり、のち貴族院議員として活躍した人物で、小田原には政財界の要人が別荘を構えた明治・大正期の風潮のなかでこの地を選んだ。数寄屋風の主屋、茶室「雨香亭」、回遊式庭園からなり、近代小田原の別邸文化を今に伝える。南町の武家地由来の町並みのなかにあり、諸白小路・西海子小路周辺の歴史的景観の核の一つとなっている。平成28年（2016年）に小田原市歴史的風致形成建造物に指定され、2019年市有化のうえ「松本剛吉記念館」として一般公開されている。庭園と建物の見学が可能で、南町散策の拠点として人気が高い。',
      sources: [{ label: '松本剛吉記念館', url: 'https://www.matsumoto-goukichi.com/building.html' }, { label: '小田原市', url: 'https://www.city.odawara.kanagawa.jp/field/lifelong/culture/historical_structure/p20642.html' }] },
    { lat: 35.244773, lng: 139.153718, name: '小田原文学館・北村透谷碑・白秋童謡館・尾崎一雄邸（南町2-3-4）', label: '小田原文学館ほか', color: '#be185d', tooltipDirection: null,
      description: '小田原を代表する文学ゆかりの施設が一つの敷地に集まる。北村透谷の文学碑（碑文は島崎藤村の揮毫）が境内に立ち、北原白秋の童謡資料を展示する白秋童謡館（登録有形文化財）、尾崎一雄の「冬眠居」書斎が移築保存されるなど、近代文学と小田原の関わりを体感できる。建物はもともと明治・大正期の元老・田中光顕の別邸で、のち文学館として整備された。西海子小路の桜並木の先にあり、諸白小路・南町の歴史地区と文学の町としての小田原を結ぶ拠点である。展示・イベントも多く、散策の途中で立ち寄りやすい。',
      sources: [{ label: '小田原市（文学館）', url: 'https://www.city.odawara.kanagawa.jp/public-i/facilities/literature-museum/bungakukan.html' }, { label: 'おだわらデジタルミュージアム', url: 'https://odawara-digital-museum.jp/point/detail/617/' }] },
    { lat: 35.245629976659124, lng: 139.1525974526273, name: '静山荘（旧望月軍四郎別邸）（南町3-1-20）', label: '静山荘', color: '#0d9488', tooltipDirection: null,
      description: '実業家・望月軍四郎が小田原市南町に構えた別荘で、農家建築を移築した素朴で風情ある佇まいが特徴である。望月軍四郎は明治期に製糸・貿易などで財をなした実業家で、小田原には政財界人が別荘を置いた時代に、武家地由来の南町の一角にこの静山荘を建てた。諸白小路と西海子小路の交差点付近に位置し、城下町の小路と近代別荘文化が交差する象徴的な存在である。市の優れた建造物として歴史的風致に位置づけられ、外観や庭の雰囲気を道からうかがうことができる。南町散策の目印の一つとなっている。',
      sources: [{ label: 'おだわらデジタルミュージアム', url: 'https://odawara-digital-museum.jp/point/detail/176/' }] },
    { lat: 35.246666135257605, lng: 139.15049167524205, name: '豆相人車鉄道 旧小田原駅跡（早川口・国道1号付近）', label: '旧小田原駅跡', color: '#c2410c', tooltipDirection: null,
      description: '明治29年（1896年）に小田原〜熱海間で開業した豆相人車鉄道の旧小田原駅の跡地である。人馬が客車を引く「人車鉄道」という珍しい方式で、箱根の峠を避けて海岸沿いで熱海へ向かうルートを走った。現在のJR小田原駅より南東、国道1号・早川口交差点付近に石碑が残り、南町・諸白小路周辺からも徒歩で訪れやすい。東海道本線の熱海線延伸に伴い廃止されたが、明治期の地域交通や観光開発の歴史を伝える貴重な遺構として、小田原市や鉄道史愛好家により顕彰されている。',
      sources: [{ label: 'sloway（豆相人車鉄道）', url: 'http://sloway.net/zusou/history.html' }] },
    { lat: 35.2474585, lng: 139.1523143, name: '対潮閣跡（南町1-5-32付近）', label: '対潮閣跡', color: '#7c3aed', tooltipDirection: null,
      description: '山下汽船（現・商船三井）創業者・山下亀三郎が大正期に建てた海を望む別邸「対潮閣」の跡地である。日露戦争で参謀として活躍した秋山真之が、大正7年（1918年）2月にここで療養の末、49歳で逝去したことで知られ、近代史・文学ファンの訪れるスポットとなっている。石垣、釣鐘石、通用門などが残り、南町の海に面した高台という立地とあわせて、当時の別荘文化を偲ばせる。近隣には静閑亭や旧松本剛吉別邸があり、南町一帯が明治・大正期の政財界人別荘地として賑わった歴史を伝えている。',
      sources: [{ label: '歴史の風景', url: 'https://yhistoricalplace2.web.fc2.com/historical_place/kamesaburo_yamashita/index.html' }, { label: 'note', url: 'https://note.com/seikantei/n/nb68282b1f87a' }] },
    { lat: 35.24571985815069, lng: 139.15322363345845, name: '自怡荘跡地（野崎幻庵別荘・メガネスーパー創業者豪邸付近）', label: '自怡荘跡地', color: '#b91c1c', tooltipDirection: null, shape: 'star',
      description: '明治期の実業家・野崎幻庵（野崎廣太）が十字町・諸白小路（現南町）に構えた別荘「自怡荘」の跡地である。幻庵は製紙・金融などで活躍し、茶の湯や文人趣味でも知られた人物で、敷地内には茶室「葉雨庵」が設けられていた。諸白小路は江戸期に諸白酒にちなむ武家地の小路として知られたが、明治以降はこうした別荘が建ち、近代的な町へと変貌していく。のちメガネスーパー創業者がこの地に豪邸を建てた経緯もあり、江戸の小路から明治の別荘、現代の商業まで、時代層の重なりを感じさせる地点である。',
      sources: [{ label: '歴史の風景（野崎幻庵）', url: 'https://yhistoricalplace2.web.fc2.com/historical_place/youan/index.html' }, { label: 'rarea', url: 'https://rarea.events/event/195726' }] },
    { lat: 35.24487415407747, lng: 139.15529778011884, name: 'かこながや（水主長屋）', label: 'かこながや（水主長屋）', color: '#0c4a6e', tooltipDirection: null,
      description: '江戸時代、稲葉氏が藩主の頃、御船小屋の隣に水主（かこ＝水軍の船乗り）の長屋があったことに由来する町地名である。「万治図」（1660年）の小田原城絵図には「御船小屋」と並んで記載され、城下町の海運・船方・水主らが居住した地域として知られる。小田原は北条氏時代から水軍の拠点でもあり、江戸期にも海上輸送や漁業に関わる人々がこの付近に集住した。現在は町名碑が残り、南町の海に近い一角がかつて船と労働の町であったことを伝えている。諸白小路・狩野殿小路など武家地の小路とは性格を異にする、城下町の職人・労働者層の町名として貴重である。',
      sources: [{ label: '0465.net', url: 'https://www.0465.net/map/index.html?i=801' }, { label: '小田原市', url: 'https://www.city.odawara.kanagawa.jp/global-image/units/500025/1-20210902175224.pdf' }, { label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { lat: 35.24719609514179, lng: 139.15370991255148, name: '筋違橋町（すじかいばしちょう）', label: '筋違橋町', color: '#6b21a8', tooltipDirection: null,
      description: '小田原城下の歴史的町名で、東海道から南へ延びる一帯を指す。史料では諸白小路・狩野殿小路・安斎小路が「筋違橋町」の小路として並んで記され、城下の地割りを理解するうえで重要な地名である。筋違橋は斜めに架かった橋に由来するとされ、道や川が斜めに交わる地形的特徴、あるいは城下の区画が筋違いに走ることに因むともいわれる。武家地と町人地の境や、東海道と南側の小路群を結ぶ結節点として機能し、諸白小路をはじめとする南町の小路の歴史を語る際に欠かせない町名である。小田原市の歴史的町名の解説や町名碑でも紹介されている。',
      sources: [{ label: '小田原市（歴史的町名）', url: 'https://www.city.odawara.kanagawa.jp/field/lifelong/property/topics/tyoumeihi.html' }, { label: '0465.net', url: 'https://www.0465.net/map/index.html?i=802' }] },
    { lat: 35.2491008040028, lng: 139.16004770569708, name: '松原神社', label: '松原神社', color: '#0f766e', tooltipDirection: null,
      description: '小田原の総鎮守として古くから崇敬を集める神社である。創建は近衛天皇の久安年間（1145〜1150年）の勧請との伝承があり、鶴の森明神・松原大明神と称された時代を経て、明治2年（1869年）に松原神社と改称した。北条氏・稲葉氏・大久保氏と、歴代の小田原城主が厚く信仰し、江戸時代には小田原宿十九町の総鎮守として藩の財で社費が賄われた。現在は県社で、小田原三大明神の一社として、城下町の精神的な中心の役割を果たし続けている。かまぼこ通りや海に近い町の北東に鎮座し、南町・諸白小路周辺からも参拝しやすい位置にある。',
      sources: [{ label: '松原神社公式', url: 'https://odawaramatsubarajinja.com/' }, { label: '神奈川県神社庁', url: 'https://www.kanagawa-jinja.or.jp/shrine/1210143-000/' }, { label: '観光かながわNOW', url: 'https://www.kanagawa-kankou.or.jp/spot/1158' }] },
    { lat: 35.25014734289875, lng: 139.1528205329637, name: '報徳二宮神社', label: '報徳二宮神社', color: '#78350f', tooltipDirection: 'bottom',
      description: '二宮尊徳（金次郎）を御祭神とする神社で、報徳思想の総本山的な存在である。明治27年（1894年）、旧小田原城二の丸小峰曲輪の一角に、伊豆・三河・遠江・駿河・甲斐・相模の6か国報徳社の総意により創建された。尊徳は小田原藩領でも報徳仕法を実践し、領民救済に尽くしたと伝えられ、拝殿の礎石には天保の大飢饉の際に尊徳が城内米蔵を開いて救済した時の礎石が用いられている。明治42年（1909年）に本殿・幣殿を新築し、神明造りの社殿が現在の景観を形づくっている。神社本庁の別表神社で、小田原城址公園の北西に位置し、城と町の歴史を結ぶスポットである。',
      sources: [{ label: '報徳二宮神社公式', url: 'https://www.ninomiya.or.jp/info/' }, { label: '御祭神・二宮尊徳翁', url: 'https://www.ninomiya.or.jp/sontoku/' }, { label: 'Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E5%A0%B1%E5%BE%B3%E4%BA%8C%E5%AE%AE%E7%A5%9E%E7%A4%BE_(%E5%B0%8F%E7%94%B0%E5%8E%9F%E5%B8%82)' }] },
    { lat: 35.24754510670632, lng: 139.15604991263515, name: 'ういろう本店', label: 'ういろう本店', color: '#ca8a04', tooltipDirection: 'bottom',
      description: '室町時代から続く外郎（ういろう）家の老舗で、家伝薬「透頂香」の製作者としても知られる。賓客接待用に考案した蒸し菓子がのちに「ういろう」として広まり、現在も製造・販売している。起源は1368年（応安元年）に元から渡来した陳延祐に遡り、北条早雲の招きで1504年頃に小田原に移住して以来、25代続いている。米粉・砂糖・水を主原料にした白・緑・紅などの棹物が名物で、江戸時代には東海道の名物として『東海道名所記』やケンペル『日本誌』に記され、全国のういろう文化の源流とされる。東海道筋に面した立地で、諸白小路・南町周辺からも徒歩で訪れやすく、小田原観光の定番スポットである。',
      sources: [{ label: 'ういろう本店（歴史）', url: 'https://www.uirou.co.jp/history/' }, { label: 'ちえのともしび', url: 'https://chienotomoshibi.jp/uirou/' }, { label: 'Wikipedia', url: 'https://ja.wikipedia.org/wiki/%E3%81%86%E3%81%84%E3%82%8D%E3%81%86_(%E4%BC%81%E6%A5%AD)' }] },
    { lat: 35.24658639198841, lng: 139.1566450193041, name: '茶畑町（ちゃばたけちょう）', label: '茶畑町', color: '#065f46', tooltipDirection: null,
      description: '小田原城下の江戸時代の町人地を表す歴史的町名である。東海道筋の脇に位置し、この一帯でかつて茶の栽培が行われていたことに由来するといわれる。城下町であり宿場町でもあった小田原では、東海道沿いに町人地が発達し、茶畑町はそのなかで茶生産や茶商いと結びついた地名として残った。小田原市では町名碑などで過去の地名を伝える取り組みが行われており、武家地の小路（諸白小路・西海子小路など）とは異なる、町人・商業の歴史を感じさせる町名として紹介されている。',
      sources: [{ label: 'ツナガルマップ（小田原の町名）', url: 'https://www.tsunagaru-map.com/odawara-names-basic/map.html?point=920' }, { label: '小田原市（町名・地名）', url: 'https://www.city.odawara.kanagawa.jp/about/introduction/history/timei.html' }] },
    { lat: 35.2510456834545, lng: 139.15344468712, name: '小田原城', label: '小田原城', color: '#374151', tooltipDirection: 'bottom',
      description: '戦国時代から続く小田原のシンボルで、北条氏の本拠として難攻不落の城下町を形成した。のち稲葉氏・大久保氏などが城主を務め、江戸期には東海道の要衝として栄えた。現在は復興天守・常盤木門・馬出門などが整備され、城址公園として歴史・観光の中心となっている。南町・諸白小路は城の南西に広がる武家地に含まれ、城下町の地割りを理解するうえで城址とセットで訪れたいスポットである。',
      sources: [{ label: '小田原城公式', url: 'https://www.city.odawara.kanagawa.jp/encycl/odawara-castle/' }] },
    { lat: 35.256164102368004, lng: 139.15576140682765, name: '小田原駅', label: '小田原駅', color: '#059669', tooltipDirection: null,
      description: 'JR東海道本線・東海道新幹線・小田急小田原線が乗り入れる小田原の玄関口で、1920年（大正9年）に開業した。南町・諸白小路周辺へは徒歩15〜20分で、城下町の武家地由来の町並みを歩きながら向かえる。駅の南東には豆相人車鉄道の旧小田原駅跡（早川口付近）があり、明治期の交通史とあわせて訪れると小田原の変遷がより深く理解できる。',
      sources: [{ label: 'JR東日本', url: 'https://www.jreast.co.jp/station/stations/878.html' }] },
    { lat: 35.243452421280864, lng: 139.15786012531294, name: '荒久の灯台', label: '荒久の灯台', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原市南町付近の荒久地区に立つ灯台で、漁港や海岸の目印として、また地域のランドマークとして親しまれている。荒久は海に面した一角で、かまぼこ通りや御幸の浜にも近く、南町・諸白小路周辺から海側へ足を延ばした際の目印となる。',
      sources: [] },
    { lat: 35.25355017061354, lng: 139.14328952727084, name: '小峰御鐘ノ台大堀切東堀', label: '小峰御鐘ノ台大堀切東堀', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城総構の北西・城山丘陵にある小峰御鐘ノ台大堀切の「東堀」である。後北条氏が八幡山〜小峰の尾根を断ち切る形で築いた三重空堀（東・中・西）のうち、現存規模が最大で、堀底に遊歩道が整備された空堀散策ルートとして人気がある。長さ約220〜280m、幅約20〜30m、深さは土塁頂から約12〜15mあり、法面は50〜60度の急斜面で関東ロームの滑りやすい土質とあわせ敵の登攀を防いだ。発掘で堀障子・土橋状部分・横矢掛かりが確認され、天正期総構の代表的遺構として小田原市や観光案内で紹介されている。小田原駅西口から徒歩約20分、箱根板橋駅から徒歩約11分。南町の武家地遺構とあわせて、城下町全体の防御構造を理解するうえで貴重なスポットである。',
      sources: [
        { label: '小田原観光', url: 'https://www.odawara-kankou.com/spot/spot_area/oohorikiri.html' },
        { label: '小田原市（城の回廊）', url: 'https://www.city.odawara.kanagawa.jp/kanko/corridor/castle/p10002.html' },
        { label: 'his-trip', url: 'https://www.his-trip.info/siseki/entry2479.html' },
        { label: 'じゃらん', url: 'https://www.jalan.net/kankou/spt_14206af2172086035/' }
      ] },
    { lat: 35.243452421280864, lng: 139.15786012531294, name: '荒久の灯台', label: '荒久の灯台', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原の海辺・荒久地区に立つ灯台で、漁港や海岸の目印として地域に親しまれている。南町・諸白小路から海側へ向かう際のランドマークの一つである。',
      sources: [] },
    { lat: 35.24701461701089, lng: 139.16100646635766, name: '海へと続くトンネル', label: '海へと続くトンネル', color: '#1d4ed8', tooltipDirection: null,
      description: 'かまぼこ通り方面から海側へ抜ける通路として知られるトンネルである。旧東海道筋の町並みと海とを結び、歩いて海辺や御幸の浜へ向かう際に利用できる。かまぼこ通り散策の延長で海まで足を延ばすルートの目印となっている。',
      sources: [] },
    { lat: 35.24518150663211, lng: 139.15930097306406, name: '御幸の浜', label: '御幸の浜', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原の海岸に広がる御幸の浜は、海に面した砂浜・海岸のスポットとして市民や観光客に親しまれている。南町・諸白小路周辺から東へ向かうと、かまぼこ通りを経て海辺に出られ、城下町の歴史と海の景観を一度に楽しめる。',
      sources: [] },
    { lat: 35.24716670727812, lng: 139.14817605993196, name: '居神神社', label: '居神神社', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原に鎮座する居神神社は、地域の氏神として古くから信仰されている。城下町の西側に位置し、南町・諸白小路周辺からも参拝しやすい。小田原の町の信仰と歴史を伝えるスポットの一つである。',
      sources: [] },
    { lat: 35.24744174648453, lng: 139.15471594266543, name: '柳屋ベーカリー', label: '柳屋ベーカリー', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原・南町周辺で親しまれているパン屋「柳屋ベーカリー」である。南町散策や諸白小路・西海子小路を歩いた際の休憩やお土産の拠点として人気がある。',
      sources: [] },
    { lat: 35.24808590827724, lng: 139.16061944570703, name: '籠清本店', label: '籠清本店', color: '#1d4ed8', tooltipDirection: null,
      description: 'かまぼこ通り周辺に店を構える老舗「籠清本店」である。蒲鉾・干物など海の幸を扱い、かまぼこ通りの食文化を代表する店の一つとして知られる。南町・諸白小路から海側へ足を延ばした際の立ち寄りスポットとしても人気がある。',
      sources: [] },
    { lat: 35.245096952753364, lng: 139.1569404333824, name: '滄浪閣旧址', label: '滄浪閣旧址', color: '#1d4ed8', tooltipDirection: null,
      description: '初代内閣総理大臣・伊藤博文の別邸「滄浪閣」の旧址である。博文は小田原に別荘を構えた明治の政治家の一人で、この地で政務の合間を過ごした。南町付近にあった別荘の跡地として、近代史と小田原の別荘文化を伝えるスポットである。',
      sources: [] },
    { lat: 35.253365328262646, lng: 139.15005064295596, name: '八幡山古郭跡', label: '八幡山古郭跡', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城総構の北西、八幡山に築かれた古郭（曲輪）の跡である。後北条氏時代の城の防御体系の一部をなしており、総構の規模と構造を理解するうえで重要な遺構の一つとして紹介されている。南町の武家地遺構とあわせて、城下町全体の成り立ちを学べる。',
      sources: [] },
    { lat: 35.25212190749775, lng: 139.1517216851566, name: '小田原城 八幡山古郭東曲輪跡', label: '小田原城 八幡山古郭東曲輪跡', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城・八幡山古郭の東曲輪の跡で、総構の北西側に位置する曲輪遺構である。城の防御構造や縄張りを学ぶうえで貴重な地点で、小田原城址公園や城の回廊の解説でも触れられる。',
      sources: [] },
    { lat: 35.249190242807416, lng: 139.14147358637595, name: '松永記念館（小田原市郷土文化館分館）', label: '松永記念館', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原市郷土文化館の分館である松永記念館は、小田原の歴史・文化に関する資料を展示している。城下町や近代の別荘文化、文学など、南町・諸白小路の背景をより深く知りたい際の学習拠点として活用できる。',
      sources: [] },
    { lat: 35.248753583172665, lng: 139.14431719133296, name: '古稀庵（山縣有朋公爵別邸跡）', label: '古稀庵', color: '#1d4ed8', tooltipDirection: null,
      description: '明治・大正期の元老・山縣有朋公爵の別邸跡「古稀庵」である。山縣は小田原に複数の別荘を構えた政治家の一人で、古稀庵はその代表的な遺構として知られる。南町の別荘群（旧松本剛吉別邸・対潮閣跡など）とあわせて、近代小田原の政財界人別荘文化を伝えるスポットである。',
      sources: [] },
    { lat: 35.249898155703065, lng: 139.14380680069968, name: '皆春荘（旧山縣有朋・清浦奎吾別邸）', label: '皆春荘', color: '#1d4ed8', tooltipDirection: null,
      description: '旧山縣有朋・清浦奎吾別邸「皆春荘」は、明治・大正期の政治家ゆかりの別邸として知られる。小田原には政財界の要人が別荘を構えた歴史があり、皆春荘はその一端を伝える。南町の諸白小路周辺の別荘文化とあわせて、近代小田原の歴史を学べる。',
      sources: [] },
    { lat: 35.250771460318745, lng: 139.1457106387132, name: '小田原城 三の丸外郭新堀土塁', label: '小田原城 三の丸外郭新堀土塁', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城三の丸外郭の新堀に伴って築かれた土塁で、城の防御遺構の一つである。江戸期の城の縄張りや改修の歴史を物語り、城址公園周辺の史跡とあわせて小田原城の全体像を理解するうえで重要なポイントとなっている。',
      sources: [] },
    { lat: 35.244611419808315, lng: 139.14921957726818, name: '小田原城跡 早川口遺構', label: '小田原城跡 早川口遺構', color: '#1d4ed8', tooltipDirection: null,
      description: '小田原城跡の早川口に残る遺構で、城の虎口・出入口に関連する遺構である。早川口は南町・諸白小路周辺から城へ向かう際にも関係する歴史的な入口で、豆相人車鉄道の旧小田原駅跡もこの付近にあり、交通と城の関係を考えるうえで興味深い地点である。',
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
    { name: '諸白小路', tooltipTitle: '諸白小路（もろはくこうじ）', color: '#9f1239', latlngs: [[35.2451645, 139.1528766], [35.2470533, 139.1528730]], t: 0.72, sign: 1,
      description: '小田原城下町の南西部にあった武家地の小路で、史料上の初出は「貞享三年御引渡記録」（1686年）である。名前の由来は、城主・稲葉正則の時代に京都や大阪から杜氏（酒造りの職人）を招き、この付近で「諸白酒」を造らせたこととされる。道の両側には中級武士の屋敷が並び、東海道（現・国道1号）の南側に並行して延びる武家地の一角をなしていた。筋違橋町の小路の一つとして、狩野殿小路・安斎小路と並んで史料に記され、現在の南町の町並みの基層を形づくっている。歴史的町名碑が設置され、デジタルミュージアムや観光案内でも紹介されている。',
      sources: [{ label: '小田原市（歴史的町名）', url: 'https://www.city.odawara.kanagawa.jp/field/lifelong/property/topics/tyoumeihi.html' }, { label: '0465.net', url: 'https://www.0465.net/map/index.html?i=802' }] },
    { name: '西海子小路', tooltipTitle: '西海子小路（さいかちこうじ）', color: '#1e40af', latlngs: [[35.2452411, 139.1552844], [35.2452028, 139.1541285], [35.2451810, 139.1534154], [35.2451645, 139.1528766], [35.2451313, 139.1517373], [35.2451302, 139.1516921], [35.2451055, 139.1506258]], t: 0.07, sign: 1, fixedLabelPos: [35.24485, 139.1520],
      description: 'サイカチの木に由来する通り名で、江戸時代末期には中級藩士の武家屋敷が道の両側に十八軒並んだと伝えられる。藩主稲葉家時代の史料「永代日記」にも地名が見え、諸白小路や狩野殿小路と同様、城下の武家地を代表する小路の一つである。現在は小田原文学館・北村透谷碑・白秋童謡館・尾崎一雄邸へのアプローチとして知られ、桜並木が美しい散策路となっている。春の花見や文学ゆかりの地めぐりの拠点として人気が高く、南町の歴史と文化を体感できる代表的な小路である。',
      sources: [{ label: 'けまあけ（南町の小路）', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: '狩野殿小路', tooltipTitle: '狩野殿小路（かのうどのこうじ）', color: '#166534', latlngs: [[35.2452028, 139.1541285], [35.2456318, 139.1541255], [35.2458355, 139.1541241], [35.2472226, 139.1541146]], t: 0.52, sign: 1,
      description: '諸白小路の西側に並行して走る武家地の小路で、小田原北条氏の家臣・狩野氏の宅跡に由来する。絵師・狩野古法眼（狩野元信）の居住伝承もあり、文化史・美術史の面からも注目される。「貞享三年御引渡記録」（1686年）に初出し、史料では狩野小路・金殿小路とも表記された。筋違橋町の小路の一つとして諸白小路・安斎小路と並んで記され、城下町の地割りを理解するうえで重要な通りである。現在の南町の町並みのなかにもそのルートが引き継がれている。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }, { label: '0465.net', url: 'https://www.0465.net/map/index.html?i=802' }] },
    { name: '安斎小路', tooltipTitle: '安斎小路（あんさいこうじ）', color: '#9a3412', latlngs: [[35.2472744, 139.1552767], [35.2472004, 139.1552755], [35.2463722, 139.1552745], [35.2459051, 139.1552824], [35.2453009, 139.1552865], [35.2452411, 139.1552844], [35.2444518, 139.1553157], [35.2443969, 139.1553179], [35.2443687, 139.1553190]], t: 0.18, sign: -1, fixedLabelPos: [35.24705, 139.15482],
      description: '諸白小路の東側に位置する武家地の小路で、小田原北条氏の侍医・田村安斎（栖）の宅があったことに由来する。「貞享三年御引渡記録」（1686年）に記され、筋違橋町の小路の一つとして諸白小路・狩野殿小路と並ぶ。北条氏政・氏照兄弟が豊臣秀吉の小田原攻めののちこの地で自害したという伝承も残り、戦国末期の歴史を偲ばせる。江戸期には中級藩士の屋敷が並んだとされ、現在の南町の地割りの基層をなしている。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: '天神小路', tooltipTitle: '天神小路（てんじんこうじ）', color: '#5b21b6', latlngs: [[35.2451302, 139.1516921], [35.2454581, 139.1516920], [35.2457604, 139.1516945], [35.2463797, 139.1516970], [35.2468830, 139.1516993]], t: 0.78, sign: -1,
      description: '「貞享三年御引渡記録」に「御花畑小路」として初出し、「東海道分間延絵図」（1789〜1806年）頃から天神小路の名で呼ばれるようになった。東海道を隔てた北方の天神社に由来し、道の両側は中級藩士の武家地として整えられた。御花畑小路の名は一部の区間に今も残る。諸白小路・西海子小路などと同様、城下の武家地を代表する小路の一つで、国道1号（旧東海道）の北側に並行して走る。南町の歴史的町並みを理解するうえで欠かせない通りである。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: '御厩小路', tooltipTitle: '御厩小路（おんまやこうじ）', color: '#ca8a04', latlngs: [[35.2421129, 139.1500686], [35.2423468, 139.1502691], [35.2425018, 139.1504101], [35.2425894, 139.1504819], [35.2426728, 139.1505319], [35.2428393, 139.1505918], [35.2428980, 139.1506099], [35.2429481, 139.1506186], [35.2431266, 139.1506429], [35.2432057, 139.1506531], [35.2433674, 139.1506657], [35.2437264, 139.1506754], [35.2442198, 139.1506565], [35.2447749, 139.1506362], [35.2449489, 139.1506299], [35.2451055, 139.1506258], [35.2453443, 139.1506197], [35.2454405, 139.1506168], [35.2461292, 139.1505897], [35.2466355, 139.1505772], [35.2467289, 139.1505661]], fixedLabelPos: [35.24562, 139.15005],
      description: '「寛文九年火災報告に関する文書」（1669年）に初出する古い小路で、西海子小路との交差点西側に小田原藩の馬屋（御厩）があったことに由来する。承応2年（1653年）には藩主・稲葉正則が馬を見に来た記録が残り、藩の馬産・馬術と深く結びついた地名である。熱海街道の起点としても機能し、城下から東へ向かう交通の要路の一角をなしていた。現在の南町の西側を東西に走るルートとして引き継がれ、諸白小路・西海子小路と交差する歴史的な小路の一つである。',
      sources: [{ label: 'けまあけ', url: 'https://kemaake.com/wp/odawara/2039' }] },
    { name: 'かまぼこ通り', color: '#0e7490', latlngs: [[35.2470681, 139.1579610], [35.2472306, 139.1584984], [35.2473296, 139.1588290], [35.2474477, 139.1591730], [35.2476156, 139.1596641], [35.2478525, 139.1603293], [35.2479805, 139.1606989], [35.2480026, 139.1607628], [35.2481470, 139.1611287], [35.2482300, 139.1612852], [35.2482585, 139.1613357], [35.2484002, 139.1616404], [35.2486005, 139.1620756], [35.2486098, 139.1620976], [35.2487989, 139.1625105]], t: 0.5, sign: 1,
      description: '旧東海道の小田原筋の一部をなす通りで、蒲鉾屋・干物屋など約30店舗が並ぶ漁師町風情の商店街として知られる。鈴廣かまぼこ博物館をはじめ、小田原の海の幸を味わえる店が立ち並び、観光・食のスポットとして人気が高い。小田原城下から海側へ向かう歴史ある街道の面影を残し、南町・諸白小路周辺から東へ足を延ばすと、城下町の武家地と海辺の町人地をつなぐルートとして体験できる。散策や買い物の拠点として訪れたい通りである。',
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
      var streetTooltipHtml = buildTooltipHtml(s.tooltipTitle || s.name, s.description, s.sources);
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
    var streetTooltipHtml = buildTooltipHtml(s.tooltipTitle || s.name, s.description, s.sources);
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
  var route1Description = '東海道の現道を継承する国道1号は、箱根湯本〜小田原〜国府津を結び、小田原城下の北側を通る。江戸時代の東海道にほぼ沿うルートで、五街道の一つとして江戸と京・大坂を結んだ歴史を持つ。南町の諸白小路・西海子小路・狩野殿小路・天神小路などは、いずれもこの国道1号（旧東海道）の南側に並行して延びた武家地の小路であり、城下町の地割りは東海道を基準軸として形成された。現在も小田原の南北を分ける軸として機能し、南町散策の際の目印となる。';
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