// ============ 工具 ============
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var today=function(){return new Date().toISOString().slice(0,10)};
var loadTask=function(){try{return JSON.parse(localStorage.getItem('task_'+today())||'{}')}catch(e){return{}}};
var saveTask=function(d){localStorage.setItem('task_'+today(),JSON.stringify(d))};

// ============ 日期驱动工具 ============
var dayOfYear=function(){var n=new Date();var s=new Date(n.getFullYear(),0,0);return Math.floor((n-s)/(1000*60*60*24))};
var dayIndex=function(total){return dayOfYear()%total};
var dailyPick=function(total,n){var seed=dayOfYear();var arr=[];for(var i=0;i<total;i++)arr.push(i);for(var i=0;i<n&&i<total-1;i++){var r=(seed*31+i*7+13)%(total-i)+i;var t=arr[i];arr[i]=arr[r];arr[r]=t;}return arr.slice(0,n)};


// ============ 古诗数据 ============
var POEMS=[
  {title:'望庐山瀑布',author:'[唐] 李白',content:'日照香炉生紫烟，\n遥看瀑布挂前川。\n飞流直下三千尺，\n疑是银河落九天。'},
  {title:'题西林壁',author:'[宋] 苏轼',content:'横看成岭侧成峰，\n远近高低各不同。\n不识庐山真面目，\n只缘身在此山中。'},
  {title:'游山西村',author:'[宋] 陆游',content:'莫笑农家腊酒浑，\n丰年留客足鸡豚。\n山重水复疑无路，\n柳暗花明又一村。'},
  {title:'黄鹤楼送孟浩然之广陵',author:'[唐] 李白',content:'故人西辞黄鹤楼，\n烟花三月下扬州。\n孤帆远影碧空尽，\n唯见长江天际流。'},
  {title:'送元二使安西',author:'[唐] 王维',content:'渭城朝雨浥轻尘，\n客舍青青柳色新。\n劝君更尽一杯酒，\n西出阳关无故人。'},
  {title:'过故人庄',author:'[唐] 孟浩然',content:'故人具鸡黍，\n邀我至田家。\n绿树村边合，\n青山郭外斜。'},
  {title:'望洞庭',author:'[唐] 刘禹锡',content:'湖光秋月两相和，\n潭面无风镜未磨。\n遥望洞庭山水翠，\n白银盘里一青螺。'},
  {title:'忆江南',author:'[唐] 白居易',content:'江南好，\n风景旧曾谙。\n日出江花红胜火，\n春来江水绿如蓝。\n能不忆江南？'},

  {title:'静夜思',author:'[唐] 李白',content:'床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。'},
  {title:'春晓',author:'[唐] 孟浩然',content:'春眠不觉晓，\n处处闻啼鸟。\n夜来风雨声，\n花落知多少。'},
  {title:'登鹳雀楼',author:'[唐] 王之涣',content:'白日依山尽，\n黄河入海流。\n欲穷千里目，\n更上一层楼。'},
  {title:'咏柳',author:'[唐] 贺知章',content:'碧玉妆成一树高，\n万条垂下绿丝绦。\n不知细叶谁裁出，\n二月春风似剪刀。'},
  {title:'悯农（其一）',author:'[唐] 李绅',content:'春种一粒粟，\n秋收万颗子。\n四海无闲田，\n农夫犹饿死。'},
  {title:'悯农（其二）',author:'[唐] 李绅',content:'锄禾日当午，\n汗滴禾下土。\n谁知盘中餐，\n粒粒皆辛苦。'},
  {title:'江雪',author:'[唐] 柳宗元',content:'千山鸟飞绝，\n万径人踪灭。\n孤舟蓑笠翁，\n独钓寒江雪。'},
  {title:'寻隐者不遇',author:'[唐] 贾岛',content:'松下问童子，\n言师采药去。\n只在此山中，\n云深不知处。'},
  {title:'山行',author:'[唐] 杜牧',content:'远上寒山石径斜，\n白云生处有人家。\n停车坐爱枫林晚，\n霜叶红于二月花。'},
  {title:'清明',author:'[唐] 杜牧',content:'清明时节雨纷纷，\n路上行人欲断魂。\n借问酒家何处有，\n牧童遥指杏花村。'},
  {title:'江南春',author:'[唐] 杜牧',content:'千里莺啼绿映红，\n水村山郭酒旗风。\n南朝四百八十寺，\n多少楼台烟雨中。'},
  {title:'蜂',author:'[唐] 罗隐',content:'不论平地与山尖，\n无限风光尽被占。\n采得百花成蜜后，\n为谁辛苦为谁甜。'},
  {title:'江畔独步寻花',author:'[唐] 杜甫',content:'黄四娘家花满蹊，\n千朵万朵压枝低。\n留连戏蝶时时舞，\n自在娇莺恰恰啼。'},
  {title:'绝句',author:'[唐] 杜甫',content:'两个黄鹂鸣翠柳，\n一行白鹭上青天。\n窗含西岭千秋雪，\n门泊东吴万里船。'},
  {title:'春夜喜雨',author:'[唐] 杜甫',content:'好雨知时节，\n当春乃发生。\n随风潜入夜，\n润物细无声。'},
  {title:'早发白帝城',author:'[唐] 李白',content:'朝辞白帝彩云间，\n千里江陵一日还。\n两岸猿声啼不住，\n轻舟已过万重山。'},
  {title:'望天门山',author:'[唐] 李白',content:'天门中断楚江开，\n碧水东流至此回。\n两岸青山相对出，\n孤帆一片日边来。'},
  {title:'别董大',author:'[唐] 高适',content:'千里黄云白日曛，\n北风吹雁雪纷纷。\n莫愁前路无知己，\n天下谁人不识君。'},
  {title:'枫桥夜泊',author:'[唐] 张继',content:'月落乌啼霜满天，\n江枫渔火对愁眠。\n姑苏城外寒山寺，\n夜半钟声到客船。'},
  {title:'渔歌子',author:'[唐] 张志和',content:'西塞山前白鹭飞，\n桃花流水鳜鱼肥。\n青箬笠，绿蓑衣，\n斜风细雨不须归。'},
  {title:'浪淘沙',author:'[唐] 刘禹锡',content:'九曲黄河万里沙，\n浪淘风簸自天涯。\n如今直上银河去，\n同到牵牛织女家。'},
  {title:'江南春',author:'[唐] 杜牧',content:'千里莺啼绿映红，\n水村山郭酒旗风。\n南朝四百八十寺，\n多少楼台烟雨中。'},
  {title:'元日',author:'[宋] 王安石',content:'爆竹声中一岁除，\n春风送暖入屠苏。\n千门万户曈曈日，\n总把新桃换旧符。'},
  {title:'泊船瓜洲',author:'[宋] 王安石',content:'京口瓜洲一水间，\n钟山只隔数重山。\n春风又绿江南岸，\n明月何时照我还。'},
  {title:'饮湖上初晴后雨',author:'[宋] 苏轼',content:'水光潋滟晴方好，\n山色空蒙雨亦奇。\n欲把西湖比西子，\n淡妆浓抹总相宜。'},
  {title:'惠崇春江晚景',author:'[宋] 苏轼',content:'竹外桃花三两枝，\n春江水暖鸭先知。\n蒌蒿满地芦芽短，\n正是河豚欲上时。'},
  {title:'夏日绝句',author:'[宋] 李清照',content:'生当作人杰，\n死亦为鬼雄。\n至今思项羽，\n不肯过江东。'},
  {title:'三衢道中',author:'[宋] 曾几',content:'梅子黄时日日晴，\n小溪泛尽却山行。\n绿阴不减来时路，\n添得黄鹂四五声。'},
  {title:'示儿',author:'[宋] 陆游',content:'死去元知万事空，\n但悲不见九州同。\n王师北定中原日，\n家祭无忘告乃翁。'},
  {title:'四时田园杂兴',author:'[宋] 范成大',content:'昼出耘田夜绩麻，\n村庄儿女各当家。\n童孙未解供耕织，\n也傍桑阴学种瓜。'},
  {title:'小池',author:'[宋] 杨万里',content:'泉眼无声惜细流，\n树阴照水爱晴柔。\n小荷才露尖尖角，\n早有蜻蜓立上头。'},
  {title:'晓出净慈寺送林子方',author:'[宋] 杨万里',content:'毕竟西湖六月中，\n风光不与四时同。\n接天莲叶无穷碧，\n映日荷花别样红。'},
  {title:'春日',author:'[宋] 朱熹',content:'胜日寻芳泗水滨，\n无边光景一时新。\n等闲识得东风面，\n万紫千红总是春。'},
  {title:'观书有感',author:'[宋] 朱熹',content:'半亩方塘一鉴开，\n天光云影共徘徊。\n问渠那得清如许，\n为有源头活水来。'},
  {title:'题临安邸',author:'[宋] 林升',content:'山外青山楼外楼，\n西湖歌舞几时休。\n暖风熏得游人醉，\n直把杭州作汴州。'},
  {title:'墨梅',author:'[元] 王冕',content:'吾家洗砚池头树，\n朵朵花开淡墨痕。\n不要人夸好颜色，\n只留清气满乾坤。'},
  {title:'石灰吟',author:'[明] 于谦',content:'千锤万凿出深山，\n烈火焚烧若等闲。\n粉骨碎身浑不怕，\n要留清白在人间。'},
  {title:'竹石',author:'[清] 郑燮',content:'咬定青山不放松，\n立根原在破岩中。\n千磨万击还坚劲，\n任尔东西南北风。'},
  {title:'所见',author:'[清] 袁枚',content:'牧童骑黄牛，\n歌声振林樾。\n意欲捕鸣蝉，\n忽然闭口立。'},
  {title:'村居',author:'[清] 高鼎',content:'草长莺飞二月天，\n拂堤杨柳醉春烟。\n儿童散学归来早，\n忙趁东风放纸鸢。'},
  {title:'己亥杂诗',author:'[清] 龚自珍',content:'九州生气恃风雷，\n万马齐喑究可哀。\n我劝天公重抖擞，\n不拘一格降人才。'},
  {title:'长歌行（节选）',author:'汉乐府',content:'青青园中葵，\n朝露待日晞。\n阳春布德泽，\n万物生光辉。\n常恐秋节至，\n焜黄华叶衰。\n百川东到海，\n何时复西归？\n少壮不努力，\n老大徒伤悲。'},
  {title:'赠汪伦',author:'[唐] 李白',content:'李白乘舟将欲行，\n忽闻岸上踏歌声。\n桃花潭水深千尺，\n不及汪伦送我情。'},
];

// ============ 数学思维导图 ============
var MINDMAP=[
  {level:1,name:'一、大数的认识',diff:1,relation:'基础模块，后续乘除法的前提'},
  {level:2,name:'1.1 认识万以上的数',diff:1,relation:'数位顺序表 → 大数读写'},
  {level:2,name:'1.2 大数的读写',diff:2,relation:'依赖1.1的数位表'},
  {level:2,name:'1.3 大数比较与改写',diff:1,relation:'依赖1.2的读写能力'},
  {level:2,name:'1.4 近似数（四舍五入）',diff:2,relation:'生活常用，后续统计基础'},
  {level:1,name:'二、三位数乘两位数',diff:2,relation:'依赖大数认识+乘法口诀'},
  {level:2,name:'2.1 乘法估算',diff:1,relation:'大数认识的应用'},
  {level:2,name:'2.2 三位数乘两位数笔算',diff:2,relation:'核心计算，2.3的基础'},
  {level:2,name:'2.3 乘法规律探索',diff:3,relation:'拓展思维，因数×积变化规律'},
  {level:1,name:'三、除数是两位数的除法',diff:2,relation:'依赖乘法，与第二章互逆'},
  {level:2,name:'3.1 除法估算',diff:1,relation:'大数认识+乘法口诀'},
  {level:2,name:'3.2 除数是两位数笔算',diff:2,relation:'核心计算，试商方法是难点'},
  {level:2,name:'3.3 商不变规律',diff:3,relation:'拓展规律，后续分数基础'},
  {level:1,name:'四、线与角',diff:1,relation:'几何入门，空间思维基础'},
  {level:2,name:'4.1 线段/射线/直线',diff:1,relation:'几何基本概念'},
  {level:2,name:'4.2 角的度量与分类',diff:2,relation:'依赖4.1，后续三角形基础'},
  {level:2,name:'4.3 画角',diff:2,relation:'依赖4.2量角器使用'},
  {level:1,name:'五、运算律',diff:2,relation:'计算进阶，贯穿全册'},
  {level:2,name:'5.1 加法交换/结合律',diff:2,relation:'简化计算的基础'},
  {level:2,name:'5.2 乘法交换/结合律',diff:2,relation:'类比加法运算律'},
  {level:2,name:'5.3 乘法分配律',diff:3,relation:'最重要最难，综合应用'},
  {level:1,name:'六、统计',diff:1,relation:'综合应用，贯穿全书'},
  {level:2,name:'6.1 条形统计图',diff:1,relation:'数据收集与展示'},
  {level:2,name:'6.2 数据分析',diff:2,relation:'依赖6.1的图表'},
];

var CONCEPTS=[
  {cat:'大数',name:'数位顺序表',formula:'万→十万→百万→千万→亿',explain:'从右往左，每四位一级'},
  {cat:'大数',name:'四舍五入',formula:'看尾数最高位≥5进1',explain:'比如382940≈38万'},
  {cat:'乘法',name:'三位数×两位数',formula:'相同数位对齐，从个位乘起',explain:'个位乘→十位乘→相加'},
  {cat:'乘法',name:'积的变化规律',formula:'一个因数×n→积×n',explain:'25×4=100，25×40=1000'},
  {cat:'除法',name:'除数试商',formula:'四舍五入法试商',explain:'196÷32看作196÷30试商6'},
  {cat:'除法',name:'商不变规律',formula:'被除数除数同×同÷→商不变',explain:'200÷40=20÷4=5'},
  {cat:'线角',name:'角的分类',formula:'锐<直<钝<平<周',explain:'一周=360°=两个平角=四个直角'},
  {cat:'运算律',name:'加法交换律',formula:'a+b=b+a',explain:'交换位置和不变'},
  {cat:'运算律',name:'加法结合律',formula:'(a+b)+c=a+(b+c)',explain:'凑整优先组合'},
  {cat:'运算律',name:'乘法分配律',formula:'a×(b+c)=a×b+a×c',explain:'最重要！25×44=1100'},
  {cat:'大数',name:'亿以内数的读法',formula:'先分级，从高位读起',explain:'每级末尾零不读，中间零只读一个'},
  {cat:'大数',name:'亿以内数的写法',formula:'从高位写起，哪一位上没有写0',explain:'写数也要先分级'},
  {cat:'大数',name:'比较大小',formula:'位数多的大，位数相同的从高位比',explain:'85300>83500，看高位'},
  {cat:'大数',name:'改写和省略',formula:'改写成"万"或"亿"',explain:'改写是精确值，省略是近似值'},
  {cat:'乘法',name:'估算',formula:'把因数看成整十整百数',explain:'298×31≈300×30=9000'},
  {cat:'乘法',name:'单价×数量=总价',formula:'总价÷数量=单价',explain:'3支笔×5元=15元'},
  {cat:'乘法',name:'速度×时间=路程',formula:'路程÷速度=时间',explain:'60km/h×3h=180km'},
  {cat:'除法',name:'除数是两位数的除法',formula:'从被除数高位除起，先看前两位',explain:'432÷18，先看43够除18商2'},
  {cat:'除法',name:'有余数的除法',formula:'被除数÷除数=商…余数',explain:'余数必须小于除数'},
  {cat:'线角',name:'直线射线线段',formula:'线段有两个端点，射线一个，直线没有',explain:'线段可测量长度'},
  {cat:'线角',name:'角的度量',formula:'量角器：中心对顶点，0线对一边',explain:'量角要注意内圈外圈'},
  {cat:'线角',name:'画角',formula:'画射线→点对齐→连线→标度数',explain:'先画一条射线，再用量角器'},
  {cat:'线角',name:'平行与垂直',formula:'同一平面内不相交=平行，相交成直角=垂直',explain:'平行线间距离处处相等'},
  {cat:'运算律',name:'乘法交换律',formula:'a×b=b×a',explain:'4×25=25×4=100'},
  {cat:'运算律',name:'乘法结合律',formula:'(a×b)×c=a×(b×c)',explain:'(25×4)×3=25×(4×3)=300'},
  {cat:'运算律',name:'连减的性质',formula:'a-b-c=a-(b+c)',explain:'100-25-35=100-(25+35)=40'},
  {cat:'运算律',name:'连除的性质',formula:'a÷b÷c=a÷(b×c)',explain:'120÷5÷4=120÷(5×4)=6'},
  {cat:'统计',name:'平均数',formula:'总数量÷总份数=平均数',explain:'(90+85+95)÷3=90分'},
  {cat:'统计',name:'复式条形统计图',formula:'用不同颜色区分不同类别',explain:'可以直观比较两组数据'},
];

var QUIZ_BASIC=[
  {q:'345 × 12 = ?',options:['4140','4040','4240','4150'],answer:0,explain:'345×2=690，345×10=3450，相加=4140'},
  {q:'下面哪个是锐角？',options:['95°','90°','45°','180°'],answer:2,explain:'小于90°的角是锐角'},
  {q:'600÷30=?',options:['2','20','200','0.2'],answer:1,explain:'60÷3=20，商不变规律'},
  {q:'25×40=?',options:['100','1000','800','400'],answer:1,explain:'25×4=100，所以25×40=1000'},
  {q:'最大的四位数是？',options:['9999','10000','9998','9000'],answer:0,explain:'四个9组成的四位数最大=9999'},
];
var QUIZ_IMPROVE=[
  {q:'简便算：25×44',options:['25×40+25×4=1100','25×40=1000','25×4=100','110'],answer:0,explain:'乘法分配律：25×(40+4)=25×40+25×4=1100'},
  {q:'420÷35简算',options:['420÷7=60，60÷5=12','420÷35=12（直接除）','420÷35=10','420÷35=15'],answer:0,explain:'35=7×5，分解因数'},
  {q:'8元一本，买125本？',options:['1000元','100元','10000元','500元'],answer:0,explain:'8×125=8×(100+25)=1000元'},
  {q:'时针走一圈是？',options:['360°（周角）','180°（平角）','90°（直角）','60°'],answer:0,explain:'时针走一圈=12小时=360°'},
  {q:'542300≈？（省略万位）',options:['54万','55万','50万','5万'],answer:0,explain:'千位2<5，舍去→54万'},
];
var QUIZ_CHALLENGE=[
  {q:'9999×9999简便算？',options:['(10000-1)×9999=99980001','90000000','80000000','99800001'],answer:0,explain:'(10000-1)×9999=99990000-9999=99980001'},
  {q:'一个数乘100比原数多9900，原数？',options:['100','99','101','10'],answer:0,explain:'原数×99=9900→原数=100'},
  {q:'3、5、0、0组只读一个零的数',options:['3050（三千零五十）','3500','0305','5300'],answer:0,explain:'3050读三千零五十，只读一个零'},
  {q:'∠1+∠2=180°，∠1比∠2大40°，求∠1',options:['110°','70°','90°','100°'],answer:0,explain:'∠1=(180+40)÷2=110°'},
  {q:'规律：1,4,9,16,?,36',options:['25','20','24','30'],answer:0,explain:'1²,2²,3²,4²,5²,6² → 25'},
];

var PITFALLS=[
  {pit:'大数读写：零的读法',wrong:'80046000 读作 八千零零四万六千',right:'读作 八千零四万六千',tip:'每级末尾零不读，中间不管几个只读一个'},
  {pit:'乘法竖式：对位错误',wrong:'345×12 写成 690+345=1035',right:'690+3450=4140',tip:'十位乘的积要和十位对齐'},
  {pit:'除法试商：偏大偏小',wrong:'196÷32 直接商7',right:'把32看作30试商6',tip:'用四舍五入法把除数看作整十数试商'},
  {pit:'运算律混淆',wrong:'25×(40+4)=25×40+4=1004',right:'25×(40+4)=1000+100=1100',tip:'a×(b+c)=a×b+a×c，不是a×b+c！'},
  {pit:'角的单位漏写',wrong:'∠A=90',right:'∠A=90°',tip:'角的单位是"度(°)"不能漏写'},
  {pit:'商不变规律：忘除',wrong:'800÷200=400÷100=4→写400',right:'800÷200=8÷2=4',tip:'被除数和除数要同时除以同一个数'},
  {pit:'近似数方向搞反',wrong:'548000≈55万',right:'548000≈55万（千位8≥5进1）',tip:'四舍五入看省略位的最高位'},
  {pit:'数位和计数单位混淆',wrong:'个、十、百、千是数位',right:'个、十、百、千是计数单位，个位、十位、百位是数位',tip:'计数单位不带"位"字'},
  {pit:'读数时漏读零',wrong:'40050060读作四千五万零六十',right:'四千零五万零六十',tip:'每级开头或中间的零要读'},
  {pit:'改写与省略混淆',wrong:'548000改写成万=55万',right:'改写成万=54.8万，省略万≈55万',tip:'改写要精确，省略看尾数四舍五入'},
  {pit:'乘法竖式漏乘0',wrong:'304×20=608',right:'304×20=6080',tip:'因数末尾有0，先乘非0部分再补0'},
  {pit:'乘法中间有0',wrong:'206×14=2844',right:'206×14=2884',tip:'因数中间有0时，乘的时候也要乘0位'},
  {pit:'乘法分配律漏乘',wrong:'25×(40+4)=25×40+4',right:'=25×40+25×4=1100',tip:'括号外的数要和括号内每个数相乘'},
  {pit:'除到哪一位商写哪一位',wrong:'432÷18商写在百位',right:'先看前两位43够除，商2写在十位',tip:'除到被除数的哪一位商就写在哪一位上面'},
  {pit:'商中间有0',wrong:'612÷3=24',right:'612÷3=204',tip:'哪一位不够商1就商0占位'},
  {pit:'商末尾有0',wrong:'420÷4=15',right:'420÷4=105',tip:'个位不够商1商0占位'},
  {pit:'被除数除数同时乘',wrong:'600÷25=(600×4)÷25=2400÷25',right:'600÷25=(600×4)÷(25×4)=2400÷100=24',tip:'被除数和除数要同时乘同一个数'},
  {pit:'直线射线线段混淆',wrong:'直线可以测量长度',right:'直线无限长不可测量，线段可测量',tip:'只有线段有固定长度'},
  {pit:'角的大小判断',wrong:'边越长角越大',right:'角的大小与边的长短无关，与开口大小有关',tip:'用放大镜看角，角的大小不变'},
  {pit:'平角是一条直线',wrong:'平角就是一条直线',right:'平角是两条射线组成的角，只是两条边在一条直线上',tip:'角都有顶点和两条边'},
  {pit:'周角是一条射线',wrong:'周角就是一条射线',right:'周角是角的两边重合，度数为360°',tip:'周角≠0°'},
  {pit:'加法结合律误用',wrong:'38+75+25=38+(75+25)错写成38+75×25',right:'38+75+25=38+100=138',tip:'注意符号，加号不变'},
  {pit:'连减忘记变号',wrong:'100-35-25=100-(35-25)=90',right:'=100-(35+25)=40',tip:'连减变减加，括号内变加号'},
  {pit:'平均数误算',wrong:'全班平均分=(最高分+最低分)÷2',right:'全班平均分=总分÷总人数',tip:'平均数是所有数据的平均'},
  {pit:'条形图纵轴不从0开始',wrong:'纵轴从30开始画',right:'纵轴一般从0开始，能更真实反映差异',tip:'不从0开始会夸大差异'},
  {pit:'垂直符号漏标',wrong:'说两条线垂直但没标直角符号',right:'垂直必须标直角符号"┐"',tip:'看到垂直就要想到90°'},
  {pit:'积的变化规律方向反',wrong:'一个因数×2，积也×2。那因数÷2，积×2',right:'一个因数÷2，积也÷2',tip:'因数怎么变，积就怎么变（另一个因数不变）'},
  {pit:'0在乘法中的特殊',wrong:'0×任何数=任何数',right:'0×任何数=0',tip:'0乘任何数都得0'},
  {pit:'1在乘法中的特殊',wrong:'1×任何数=1',right:'1×任何数=任何数',tip:'1乘任何数等于原数'},
];

var LIFE_MATH=[
  {concept:'大数认识',life:'超市一天营业额328540元，读作"三十二万八千五百四十"。写成"32万"是近似数，写32.8540万是精确数。',q:'你家到学校约多少米？用大数试试写出来'},
  {concept:'乘法',life:'一箱苹果24个，买15箱共多少个？24×15=360个。超市用乘法快速算库存。',q:'一瓶水3元，买48瓶需要多少钱？用简便方法算'},
  {concept:'除法',life:'班上40人去秋游，每辆车坐15人，需要几辆？40÷15=2辆...10人→3辆。"进一法"。',q:'你有100元，每支笔8元，最多买几支？'},
  {concept:'线与角',life:'时钟3:00时针分针成90°直角；6:00成180°平角。剪刀张开是锐角，打开扇子是钝角。',q:'你能在家里找到几个直角？'},
  {concept:'运算律',life:'超市买25包纸巾每包4元+25瓶水每瓶4元=25×4+25×4=200。用乘法分配律25×(4+4)=25×8=200。',q:'用运算律算 4×25+6×25=?'},
  {concept:'大数认识',life:'中国人口约14亿，写成1400000000。手机号11位，是亿级的数字。',q:'查一查你所在城市的人口是多少？读出来'},
  {concept:'大数认识',life:'地球到太阳的距离约149600000千米，读作一亿四千九百六十万千米。',q:'你家到学校多少米？写成用"万"作单位的数'},
  {concept:'四舍五入',life:'超市标价9.98元≈10元；考试成绩89.5分≈90分。生活中到处是近似数！',q:'你的身高四舍五入到整厘米是多少？'},
  {concept:'乘法',life:'学校食堂每天做300份午餐，一个月（22天）做多少份？300×22=6600份。',q:'你一周吃几顿饭？一个月呢？'},
  {concept:'乘法',life:'电影院的座位是25排×30座=750个座位。一场电影满座能卖多少票？',q:'你们班有多少人？全校呢？'},
  {concept:'乘法估算',life:'买水果：苹果每斤8元，买了19斤，大约8×20=160元。带200元就够了！',q:'估算你一周的零花钱够不够买一个想要的玩具'},
  {concept:'除法',life:'班费360元买足球，每个足球45元，能买几个？360÷45=8个。',q:'你有200元，每本书38元，最多买几本？'},
  {concept:'除法',life:'长途汽车432千米路程，每小时行72千米，要几小时？432÷72=6小时。',q:'从家到学校如果骑车，大概要多久？'},
  {concept:'线与角',life:'打开笔记本电脑屏幕，屏幕和键盘的夹角约110°，是钝角。',q:'你家里能找到几个不同的角？'},
  {concept:'线与角',life:'踢足球射门时，角度越大越容易进球。最佳射门角度约30-45°。',q:'用量角器量一下剪刀张开的角度'},
  {concept:'平行与垂直',life:'铁轨是平行的，永远不相交。十字路口的斑马线互相垂直。',q:'你的房间里能找到平行和垂直的线吗？'},
  {concept:'运算律',life:'买文具：3支笔×5元+3个本×4元=3×(5+4)=27元。乘法分配律帮你速算！',q:'用简便方法算：99×8+8=?（提示：=100×8）'},
  {concept:'运算律',life:'去超市买东西，可以用加法交换律先算好算的：18+75+25=18+100=118。',q:'用运算律快速算 46+37+54+63'},
  {concept:'运算律',life:'存钱：每天存25元，存40天=25×40=1000元。用乘法结合律25×4×10=1000。',q:'如果你每天存5元，一年能存多少？'},
  {concept:'统计',life:'记录一周每天的运动时间，画条形图看看哪天运动最多！',q:'记录一周每天看书的时间并画图'},
  {concept:'统计',life:'天气预报中的平均气温，就是把每天最高温加起来除以天数。',q:'这周每天最高温是多少？算一下平均'},
  {concept:'平均数',life:'期末考试语数英三科：92+88+96=276，平均276÷3=92分。',q:'你最近三次小测验的平均分是多少？'},
  {concept:'面积',life:'你房间长4米宽3米，面积=4×3=12平方米。铺地砖需要知道面积！',q:'量一量你的书桌面积'},
  {concept:'时间计算',life:'动画片15:30开始，每集25分钟，16:20结束。一共看了几集？',q:'算算从放学到家一共多长时间'},
  {concept:'单位换算',life:'1吨=1000千克，一头大象约5吨=5000千克。你是多少千克？',q:'把家里能找到的东西重量换算成不同单位'},
  {concept:'周长',life:'学校操场长100米宽60米，跑一圈=2×(100+60)=320米。',q:'量一量你书桌的周长'},
  {concept:'大数比较',life:'比较两个城市的人口：北京约2154万，上海约2487万，上海>北京。',q:'比较一下你们班男生和女生的人数'},
  {concept:'钱的计算',life:'100元买3本书：38+42+25=105元，还差5元！学会预算很重要。',q:'你一周的零花钱够花吗？列个账单'},
  {concept:'可能性',life:'天气预报说"降水概率70%"，意思是下雨的可能性比较大，最好带伞。',q:'抛硬币10次，记录正面和反面各几次'},
];

var LISTENINGS=[
  {title:'My Family',text:'Hello, my name is Sarah. I have a happy family. My father is a doctor. He helps sick people. My mother is a teacher. She teaches English. I have a little brother. He is five years old. We have a dog. Its name is Lucky. We love each other very much.',questions:[{q:'What does Sarah\'s father do?',options:['A doctor','A teacher','A driver','A farmer'],answer:0},{q:'How old is Sarah\'s brother?',options:['Three','Four','Five','Six'],answer:2},{q:'What is the dog\'s name?',options:['Lucy','Lucky','Tom','Sam'],answer:1}]},
  {title:'A Day at School',text:'I get up at seven o\'clock in the morning. I have breakfast at half past seven. I go to school at eight. I have four classes in the morning. We have lunch at school. In the afternoon, I have two classes. I go home at four thirty. I do my homework after dinner.',questions:[{q:'When does he get up?',options:['6:00','7:00','7:30','8:00'],answer:1},{q:'How many classes in the morning?',options:['Three','Four','Five','Two'],answer:1},{q:'When does he go home?',options:['4:00','4:30','5:00','3:30'],answer:1}]},
  {title:'My Favorite Animal',text:'My favorite animal is the panda. Pandas are black and white. They live in China. They eat bamboo. They are very cute. Pandas can climb trees. They cannot run fast. There are not many pandas in the world. We should protect them.',questions:[{q:'What color are pandas?',options:['Black','White','Black and white','Brown'],answer:2},{q:'What do pandas eat?',options:['Meat','Bamboo','Fish','Grass'],answer:1},{q:'Where do pandas live?',options:['Africa','China','America','Japan'],answer:1}]},
  {title:'The Weather',text:'Today is Sunday. The weather is sunny and warm. The sky is blue. There are some white clouds. My friends and I go to the park. We fly kites and play games. We eat ice cream. We are very happy. I like sunny days best.',questions:[{q:'What day is today?',options:['Saturday','Sunday','Monday','Friday'],answer:1},{q:'How is the weather?',options:['Rainy','Cloudy','Sunny and warm','Snowy'],answer:2},{q:'What do they do in the park?',options:['Swim','Fly kites','Read','Sleep'],answer:1}]},
  {title:'Shopping',text:'My mother and I go shopping. We go to the supermarket. We buy some apples. They are five yuan a kilo. We buy two kilos. We also buy some milk and bread. The milk is ten yuan. The bread is three yuan. My mother pays thirty yuan in total. We are happy.',questions:[{q:'Where do they go?',options:['School','Supermarket','Park','Hospital'],answer:1},{q:'How much is apples per kilo?',options:['3 yuan','5 yuan','10 yuan','2 yuan'],answer:1},{q:'How much does mother pay?',options:['20 yuan','25 yuan','30 yuan','35 yuan'],answer:2}]},
  {title:'My Bedroom',text:'This is my bedroom. It is not big but clean. There is a bed near the window. There is a desk next to the bed. On the desk, there are some books and a lamp. There is a chair behind the desk. I have a bookshelf. It has many books. I like reading in my bedroom.',questions:[{q:'Where is the bed?',options:['Near the door','Near the window','Next to the desk','Behind the chair'],answer:1},{q:'What is on the desk?',options:['Books and a lamp','A computer','A toy','A clock'],answer:0},{q:'What does the writer like?',options:['Sleeping','Reading','Playing','Drawing'],answer:1}]},
];

var WORDS=[
  {unit:'Unit 1',list:[{en:'classroom',cn:'教室'},{en:'window',cn:'窗户'},{en:'blackboard',cn:'黑板'},{en:'picture',cn:'图片'},{en:'light',cn:'灯'}]},
  {unit:'Unit 2',list:[{en:'schoolbag',cn:'书包'},{en:'Chinese book',cn:'语文书'},{en:'English book',cn:'英语书'},{en:'math book',cn:'数学书'},{en:'notebook',cn:'笔记本'}]},
  {unit:'Unit 3',list:[{en:'friend',cn:'朋友'},{en:'tall',cn:'高的'},{en:'short',cn:'矮的/短的'},{en:'strong',cn:'强壮的'},{en:'thin',cn:'瘦的'}]},
  {unit:'Unit 4',list:[{en:'kitchen',cn:'厨房'},{en:'bedroom',cn:'卧室'},{en:'bathroom',cn:'浴室'},{en:'living room',cn:'客厅'},{en:'study',cn:'书房'}]},
  {unit:'Unit 5',list:[{en:'breakfast',cn:'早餐'},{en:'lunch',cn:'午餐'},{en:'dinner',cn:'晚餐'},{en:'rice',cn:'米饭'},{en:'beef',cn:'牛肉'}]},
  {unit:'Unit 7',list:[{en:'doctor',cn:'医生'},{en:'nurse',cn:'护士'},{en:'teacher',cn:'老师'},{en:'student',cn:'学生'},{en:'driver',cn:'司机'}]},
  {unit:'Unit 8',list:[{en:'apple',cn:'苹果'},{en:'banana',cn:'香蕉'},{en:'orange',cn:'橙子'},{en:'grape',cn:'葡萄'},{en:'watermelon',cn:'西瓜'}]},
  {unit:'Unit 9',list:[{en:'cat',cn:'猫'},{en:'dog',cn:'狗'},{en:'bird',cn:'鸟'},{en:'fish',cn:'鱼'},{en:'rabbit',cn:'兔子'}]},
  {unit:'Unit 10',list:[{en:'red',cn:'红色'},{en:'blue',cn:'蓝色'},{en:'green',cn:'绿色'},{en:'yellow',cn:'黄色'},{en:'white',cn:'白色'}]},
  {unit:'Unit 11',list:[{en:'big',cn:'大的'},{en:'small',cn:'小的'},{en:'long',cn:'长的'},{en:'short',cn:'短的'},{en:'new',cn:'新的'}]},
  {unit:'Unit 12',list:[{en:'run',cn:'跑'},{en:'jump',cn:'跳'},{en:'swim',cn:'游泳'},{en:'fly',cn:'飞'},{en:'walk',cn:'走'}]},
  {unit:'Unit 13',list:[{en:'happy',cn:'开心的'},{en:'sad',cn:'难过的'},{en:'angry',cn:'生气的'},{en:'tired',cn:'累的'},{en:'hungry',cn:'饿的'}]},
  {unit:'Unit 14',list:[{en:'head',cn:'头'},{en:'hand',cn:'手'},{en:'foot',cn:'脚'},{en:'eye',cn:'眼睛'},{en:'ear',cn:'耳朵'}]},
  {unit:'Unit 15',list:[{en:'spring',cn:'春天'},{en:'summer',cn:'夏天'},{en:'autumn',cn:'秋天'},{en:'winter',cn:'冬天'},{en:'season',cn:'季节'}]},
  {unit:'Unit 16',list:[{en:'Monday',cn:'星期一'},{en:'Tuesday',cn:'星期二'},{en:'Wednesday',cn:'星期三'},{en:'Thursday',cn:'星期四'},{en:'Friday',cn:'星期五'}]},
  {unit:'Unit 17',list:[{en:'sunny',cn:'晴天'},{en:'rainy',cn:'下雨'},{en:'cloudy',cn:'多云'},{en:'windy',cn:'刮风'},{en:'snowy',cn:'下雪'}]},
  {unit:'Unit 18',list:[{en:'pencil',cn:'铅笔'},{en:'ruler',cn:'尺子'},{en:'eraser',cn:'橡皮'},{en:'crayon',cn:'蜡笔'},{en:'scissors',cn:'剪刀'}]},
  {unit:'Unit 19',list:[{en:'breakfast',cn:'早餐'},{en:'lunch',cn:'午餐'},{en:'dinner',cn:'晚餐'},{en:'rice',cn:'米饭'},{en:'noodle',cn:'面条'}]},
  {unit:'Unit 20',list:[{en:'one',cn:'一'},{en:'two',cn:'二'},{en:'three',cn:'三'},{en:'four',cn:'四'},{en:'five',cn:'五'}]},
];

var GRAMMARS=[
  {title:'be动词用法',rule:'I用am，you/we/they用are，he/she/it用is',example:'I am a student. / She is tall.'},
  {title:'一般现在时',rule:'主语三单+动词s/es；其他人称用原形',example:'He plays football. / I play football.'},
  {title:'现在进行时',rule:'be动词+动词ing',example:'She is reading. / They are running.'},
  {title:'一般疑问句',rule:'句首加Do/Does（三单）；be动词提前',example:'Do you like apples? / Does he swim?'},
  {title:'特殊疑问句',rule:'疑问词(What/Where/When/Who/How)+一般疑问句',example:'What do you do? / Where does she live?'},
  {title:'名词复数',rule:'+s；以s/x/sh/ch结尾+es；不规则',example:'cats→cats; box→boxes; baby→babies'},
  {title:'物主代词',rule:'my/your/his/her/our/their + 名词',example:'This is my book. / Her name is Lily.'},
  {title:'背单词技巧1',rule:'自然拼读法：按发音记忆',example:'cat=c+a+t /kæt/'},
  {title:'背单词技巧2',rule:'词根词缀法：前缀un-表否定，-er表人',example:'happy→unhappy; teach→teacher'},
  {title:'背单词技巧4',rule:'分类记忆法：按主题归类',example:'水果：apple, banana, orange, grape'},
  {title:'背单词技巧5',rule:'反义词对照法',example:'big↔small, hot↔cold, happy↔sad'},
  {title:'have/has用法',rule:'三单用has，其他人称用have',example:'She has a book. / They have books.'},
  {title:'there be句型',rule:'There is+单数；There are+复数',example:'There is a desk. / There are chairs.'},
  {title:'祈使句',rule:'动词原形开头，无主语',example:"Open the door. / Don't run!"},
  {title:'情态动词can',rule:'can+动词原形，无人称变化',example:'I can swim. / Can you help me?'},
  {title:'人称代词',rule:'主格(I/you/he/she/it/we/they)做主语',example:'He is tall. / We are friends.'},
  {title:'宾格代词',rule:'宾格(me/you/him/her/it/us/them)做宾语',example:'Give me a book. / I like her.'},
  {title:'形容词比较级',rule:'+er；以e结尾+r；双写+er',example:'tall→taller; nice→nicer; big→bigger'},
  {title:'形容词最高级',rule:'+est；以e结尾+st；双写+est',example:'tall→tallest; nice→nicest; big→biggest'},
  {title:'现在进行时(2)',rule:'动词ing变化规则：去e+ing，双写+ing',example:'make→making; run→running'},
  {title:'一般将来时',rule:'will+动词原形 / be going to+动词原形',example:'I will go. / She is going to read.'},
  {title:'一般过去时',rule:'动词+ed；不规则变化需记忆',example:'play→played; go→went; see→saw'},
  {title:'介词on/in/at',rule:'on用于具体某天，in用于月/季/年，at用于时刻',example:'on Monday; in July; at 8:00'},
  {title:'介词方位',rule:'in在里, on在上, under在下, behind在后, next to在旁',example:'The book is on the desk.'},
  {title:'some和any',rule:'some用于肯定句，any用于否定/疑问句',example:'I have some books. / Do you have any books?'},
  {title:'a和an',rule:'a+辅音开头；an+元音(a/e/i/o/u)开头',example:'a book; an apple; an hour'},
  {title:'What time/When',rule:'What time问具体时间；When问大致时间',example:'What time is it? / When is your birthday?'},
  {title:'How many/How much',rule:'How many+可数名词；How much+不可数名词',example:'How many books? / How much water?'},
  {title:"Let's句型",rule:"Let's+动词原形，表建议",example:"Let's go to school."},
  {title:'Would like句型',rule:'would like+名词/to do，表想要',example:'I would like some milk. / Would you like to come?'},
  {title:'感叹句',rule:'What+(a/an)+形容词+名词! / How+形容词!',example:'What a big house! / How beautiful!'},
  {title:'时间表达法',rule:"整点o'clock；半点half past；过past；差to",example:'7:30=half past seven; 7:45=a quarter to eight'},
  {title:'序数词',rule:'基变序口诀：一二三特殊记，th从四起',example:'one→first; two→second; three→third; four→fourth'},
  {title:'频度副词',rule:'always>usually>often>sometimes>never',example:'I always get up at 7.'},
  {title:'连词and/but/or',rule:'and并列，but转折，or选择',example:'I like apples and bananas. / He is short but strong.'},
  {title:'like用法',rule:'like+名词/doing/to do',example:'I like apples. / I like swimming. / I like to swim.'},
  {title:'want用法',rule:'want+名词/to do',example:'I want a book. / I want to play.'},
  {title:'help用法',rule:'help sb (to) do sth',example:'I help my mother (to) clean.'},
  {title:'发音规则：字母组合',rule:'th发音：this(ð) vs think(θ)',example:'the, this, that (ð) / three, think, thank (θ)'},
];

var EXPRESS=[  {type:'每日一读',content:'小松鼠秋天忙着收集松果。它每天跑来跑去，把松果藏在地洞里。冬天来了，大雪盖住了地面。小松鼠在温暖的窝里，吃着松果，开心地笑了。\n\n问1：小松鼠秋天在做什么？\n问2：它为什么冬天不愁吃的？\n问3：这个故事告诉我们什么道理？',hint:'用"先…然后…最后…"复述故事'},
  {type:'看图说话',content:'想象你看到一幅画：一个小女孩在公园里放风筝，旁边有她的妈妈在微笑。\n\n请描述这幅画：谁在哪里做什么？心情怎样？用至少3句话。',hint:'用"有…""正在…""开心地…"等词'},
  {type:'复述训练',content:'读一遍这段话，然后不看屏幕，复述出来：\n\n春天来了，燕子从南方飞回来了。柳树发出了嫩芽，小草从土里钻出来。孩子们脱下棉袄，跑到草地上放风筝。',hint:'记住关键词：燕子、柳树、小草、孩子、风筝'},
  {type:'词语接龙',content:'用"开心"开头，每个词的最后一个字是下一个词的第一个字。\n\n开心→心情→(  )→(  )→(  )\n\n写出至少4个词！',hint:'心情→情况→况且→且说…'},
  {type:'扩句游戏',content:'把短句变长句！\n\n基础句："小鸟飞。"\n\n加"在哪里"→"小鸟在天上飞。"\n再加"什么时候"→"(  )小鸟在天上(  )飞。"\n继续加"怎样飞"→完整句：',hint:'越详细越好！'},
  {type:'每日一读',content:'森林里住着一只小刺猬。一天，它出门采果子，路上遇到了小兔子。小兔子说："你的刺真可怕！"小刺猬难过地走开了。后来，大灰狼来了，小刺猬缩成一团，用刺保护了小兔子。小兔子红着脸说："谢谢你，你的刺真有用！"\n问1：小兔子一开始为什么不喜欢小刺猬？\n问2：小刺猬怎么保护了小兔子？\n问3：这个故事告诉我们什么？',hint:'每个人都有自己的特点，看似缺点的也可能是优点'},
  {type:'看图说话',content:'想象一幅画：雨后，一道彩虹挂在天空。一个小男孩和小女孩站在草地上，指着彩虹在说话。\n请描述：天气怎么样？谁在做什么？他们可能在说什么？用至少4句话。',hint:'用"雨过天晴""五颜六色""弯弯的"等词'},
  {type:'复述训练',content:'读一遍然后复述：\n小狗阿黄最喜欢追蝴蝶。一天，一只花蝴蝶飞过篱笆，阿黄追了过去，不小心掉进了小水坑。它浑身湿透了，狼狈地爬出来。蝴蝶停在花朵上，好像在对它说："下次小心点哦！"',hint:'记住：阿黄→追蝴蝶→掉水坑→爬出来→蝴蝶说话'},
  {type:'词语接龙',content:'用"春天"开头：\n春天→天气→(  )→(  )→(  )→(  )\n写出至少5个词！',hint:'天气→气球→球拍→拍手→手心…'},
  {type:'扩句游戏',content:'把句子变长！\n基础句："花开了。"\n加"什么花"→"(  )花开了。"\n加"在哪里"→"(  )花在(  )开了。"\n加"怎样开"→完整句：',hint:'比如：粉红色的桃花在春风中悄悄地开了'},
  {type:'仿写句子',content:'例句：弯弯的月亮像小船。\n请仿写：\n1. 圆圆的太阳像(  )。\n2. 闪闪的星星像(  )。\n3. 白白的云朵像(  )。',hint:'发挥想象力，用比喻！'},
  {type:'每日一读',content:'大象伯伯开了一家水果店。第一天，小猴来买香蕉，大象伯伯多给了两根。第二天，小松鼠来买松果，大象伯伯也多给了一把。大家都说大象伯伯最善良。大象伯伯笑着说："分享让我更快乐！"\n问1：大象伯伯开的是什么店？\n问2：大象伯伯为什么多给水果？\n问3：你从中学到了什么？',hint:'善良和分享能带来真正的快乐'},
  {type:'看图说话',content:'想象：冬天，一个小朋友在堆雪人。雪人有胡萝卜鼻子、石子眼睛、树枝手臂。小朋友围着围巾，开心地站在雪人旁边。\n请描述这幅画，至少4句话。',hint:'用"大雪纷飞""白茫茫""圆滚滚"等词'},
  {type:'复述训练',content:'读一遍然后复述：\n今天是小明的生日。妈妈做了一个大蛋糕，上面插了10根蜡烛。小明许了一个愿，一口气吹灭了所有蜡烛。朋友们唱起了生日歌。小明说："这是我最开心的一天！"',hint:'记住：生日→蛋糕→蜡烛→许愿→吹蜡烛→唱歌'},
  {type:'词语接龙',content:'用"快乐"开头：\n快乐→乐趣→(  )→(  )→(  )→(  )\n写出至少5个词！',hint:'乐趣→趣味→味道→道理→理由…'},
  {type:'扩句游戏',content:'把句子变丰富！\n基础句："妈妈做饭。"\n加"什么时候"→"(  )，妈妈(  )做饭。"\n加"在哪里"→"(  )，妈妈在(  )做饭。"\n加"怎么做/什么菜"→完整句：',hint:'比如：傍晚，妈妈在厨房里忙碌地做红烧排骨'},
  {type:'仿写句子',content:'例句：春天来了，小草从土里钻出来。\n请仿写：\n1. 夏天来了，(  )。\n2. 秋天来了，(  )。\n3. 冬天来了，(  )。',hint:'想想每个季节有什么特点！'},
  {type:'每日一读',content:'乌鸦喝水的故事大家都听过吧？聪明的乌鸦把石子一颗颗放进瓶子里，水慢慢升高，乌鸦就喝到水了。这个故事告诉我们，遇到困难不要放弃，动脑筋想办法，总能解决问题。\n问1：乌鸦遇到了什么困难？\n问2：乌鸦是怎么解决问题的？\n问3：你遇到过类似的困难吗？怎么解决的？',hint:'遇到困难→想办法→动手尝试→成功！'},
  {type:'看图说话',content:'想象：教室里有老师和同学们。老师站在讲台上，同学们举手回答问题。黑板上写着数学题。\n请描述：这是哪里？谁在做什么？你最喜欢什么课？用至少4句话。',hint:'用"认真""积极""争先恐后"等词'},
  {type:'复述训练',content:'读一遍然后复述：\n森林音乐会开始了！百灵鸟唱了一首动听的歌，青蛙打起鼓来，蟋蟀拉着小提琴。萤火虫在空中飞舞，像一颗颗小星星。所有小动物都陶醉在美妙的音乐中。',hint:'记住：百灵鸟唱歌→青蛙打鼓→蟋蟀拉琴→萤火虫飞舞→大家陶醉'},
  {type:'扩句游戏',content:'把句子变生动！\n基础句："风吹过。"\n加"什么风"→"(  )风吹过。"\n加"吹过哪里"→"(  )风吹过(  )。"\n加"带来了什么感觉"→完整句：',hint:'比如：温暖的春风吹过田野，带来了花草的清香'},
  {type:'仿写句子',content:'例句：如果我是小鸟，我就在天空自由飞翔。\n请仿写：\n1. 如果我是(  )，我就(  )。\n2. 如果我是(  )，我就(  )。\n3. 如果我是(  )，我就(  )。',hint:'大胆想象！可以是大树、小鱼、星星…'},
  {type:'每日一读',content:'小蜗牛问妈妈："为什么我们生下来就要背这个又重又硬的壳呢？"妈妈说："因为我们的身体没有骨骼支撑，爬得又慢，所以需要壳来保护自己。"小蜗牛又问："毛虫姐姐也没有骨骼，为什么不用背壳？"妈妈笑着说："因为毛虫姐姐会变成蝴蝶，天空会保护她呀。"\n问1：蜗牛为什么背着壳？\n问2：毛虫为什么不背壳？\n问3：这个故事让你明白了什么？',hint:'每个人都有不同的保护方式，不用羡慕别人'},
  {type:'看图说话',content:'想象：沙滩上，一家人正在玩耍。爸爸在堆沙堡，妈妈在晒太阳，小朋友在捡贝壳。海浪轻轻地拍打着沙滩。\n请描述这幅画，至少4句话。',hint:'用"金黄色的沙滩""一望无际的大海""五颜六色的贝壳"'},
  {type:'复述训练',content:'读一遍然后复述：\n小蚂蚁发现了一块大面包屑。它想搬回家，可是太大了搬不动。它跑回去叫来了一群小伙伴。大家齐心协力，喊着口号："一二一，一二一！"终于把面包屑搬回了家。蚂蚁妈妈表扬了大家。',hint:'记住：发现面包→搬不动→叫伙伴→齐心协力→搬回家→被表扬'},
  {type:'词语接龙',content:'用"学习"开头：\n学习→习惯→(  )→(  )→(  )→(  )\n写出至少5个词！',hint:'习惯→惯性→性格→格局→局面…'},
  {type:'扩句游戏',content:'把句子写具体！\n基础句："下雨了。"\n加"什么样的雨"→"下(  )雨了。"\n加"什么时候/在哪里"→"(  )，下起了(  )雨。"\n加"感受"→完整句：',hint:'比如：傍晚，天空突然下起了倾盆大雨，哗啦啦的雨声像在演奏交响乐'},
  {type:'仿写句子',content:'例句：读书使人充实，讨论使人机智，写作使人精确。\n请仿写：\n1. (  )使人(  )，(  )使人(  )，(  )使人(  )。\n（提示：运动/快乐/思考/智慧/分享/幸福…）',hint:'用排比句式，三个分句结构相同'},];

var LIFE_TASKS=[
  {id:'brush_morning',name:'早上刷牙',icon:'🌅'},
  {id:'brush_evening',name:'晚上刷牙',icon:'🌙'},
  {id:'meal_speed',name:'就餐30分钟内',icon:'🍚'},
  {id:'sleep_early',name:'10:30前睡觉',icon:'🛏️'},
];

var SPORTS=[
  {id:'badminton',name:'打羽毛球',icon:'🏸',detail:'对打或练习发球'},
  {id:'dance',name:'舞蹈瑜伽',icon:'💃',detail:'拉伸+舞蹈动作'},
  {id:'equipment',name:'户外健身器材',icon:'🤸',detail:'小区健身器材锻炼'},
];

var FOODS=[
  {icon:'🦴',name:'骨头'},{icon:'🍚',name:'狗粮'},{icon:'🍗',name:'鸡肉'},{icon:'🥛',name:'牛奶'},
];

var BATH_STEPS=[
  {icon:'💧',name:'打湿全身'},{icon:'🫧',name:'打泡泡'},{icon:'🤲',name:'搓搓身子'},{icon:'🚿',name:'冲洗干净'},{icon:'🧖',name:'擦干吹干'},
];

// ============ 好词好句积累（1-6年级）============
var GOOD_WORDS=[
  {grade:'一年级',source:'《小蝌蚪找妈妈》',words:['碧绿','雪白','快活','游来游去'],sentence:'碧绿的池塘里长满了荷叶，小蝌蚪快活地游来游去。',analysis:'用"碧绿""雪白"等颜色词写出事物的美丽；"快活""游来游去"生动描写小蝌蚪的动作和心情。'},
  {grade:'一年级',source:'《雪地里的小画家》',words:['梅花','枫叶','月牙','竹叶'],sentence:'小鸡画竹叶，小狗画梅花，小鸭画枫叶，小马画月牙。不用颜料不用笔，几步就成一幅画。',analysis:'用动物的脚印比喻自然界的美丽图案，充满想象力；排比句式朗朗上口。'},
  {grade:'一年级',source:'《四季》',words:['尖尖','圆圆','弯弯','顽皮'],sentence:'草芽尖尖，他对小鸟说："我是春天。"荷叶圆圆，他对青蛙说："我是夏天。"',analysis:'拟人化手法赋予自然景物生命；"尖尖""圆圆"等叠词使语言富有节奏感和画面感。'},
  {grade:'一年级',source:'《小小的船》',words:['弯弯','小小','闪闪','蓝蓝'],sentence:'弯弯的月儿小小的船，小小的船儿两头尖。我在小小的船里坐，只看见闪闪的星星蓝蓝的天。',analysis:'把月亮比作小船，意境优美；叠词重复营造出童谣般的韵律，适合低年级朗读背诵。'},
  {grade:'一年级',source:'《哪座房子最漂亮》',words:['青瓦','白墙','宽宽','漂亮'],sentence:'一座房，两座房，青青的瓦，白白的墙，宽宽的门，大大的窗。三座房，四座房，房前花果香，屋后树成行。',analysis:'用简洁的词语描绘乡村房屋的美丽；"青青""白白""宽宽""大大"叠词增强画面感。'},
  {grade:'二年级',source:'《小柳树和小枣树》',words:['碧绿','翠绿','细长','光秃秃'],sentence:'小柳树的腰细细的，树枝绿绿的，真好看。小枣树呢，树枝弯弯曲曲的，一点儿也不好看。',analysis:'对比手法写出两种树的不同特点；用"细细""绿绿"等词让人物形象跃然纸上。'},
  {grade:'二年级',source:'《坐井观天》',words:['一望无际','无边无际','弄错','笑了'],sentence:'朋友，你是弄错了吧？不信，你跳出井口来看一看吧。',analysis:'成语"一望无际""无边无际"生动描绘天空的广阔；对话体寓言言简意赅，寓意深刻。'},
  {grade:'二年级',source:'《我要的是葫芦》',words:['自言自语','盯着','慢慢地','光秃秃'],sentence:'多么可爱的小葫芦哇！那个人每天都要去看几次。他盯着小葫芦自言自语地说："我的小葫芦，快长啊，快长啊！"',analysis:'"盯着""自言自语"准确写出人物的神态和动作；感叹句和反复手法表现急切心情。'},
  {grade:'二年级',source:'《古诗两首》',words:['飞流','直下','银河','落九天'],sentence:'飞流直下三千尺，疑是银河落九天。',analysis:'夸张手法写出瀑布的雄伟壮观；"飞流""直下"用动词表现水流的迅猛，气势磅礴。'},
  {grade:'二年级',source:'《窗前的气球》',words:['静静地','呆呆地','快乐','可爱'],sentence:'气球停了一会儿，开始一上一下地动起来，好像一个小脑袋在向科利亚点头。',analysis:'拟人手法把气球写得活灵活现；"静静地""呆呆地"描写科利亚的孤独，与气球的"快乐"形成对比。'},
  {grade:'三年级',source:'《我们的民族小学》',words:['鲜艳','打扮','飘扬','古老'],sentence:'早晨，从山坡上，从坪坝里，从一条条开着绒球花和太阳花的小路上，走来了许多小学生。',analysis:'排比句式展现多样的上学路线；"从……从……从……"的重复增强节奏感，描绘民族小学的独特风情。'},
  {grade:'三年级',source:'《金色的草地》',words:['金色','盛开','合拢','喜爱'],sentence:'花朵张开时，它是金色的；花朵合拢时，金色的花瓣被包住，草地就变成绿色的了。',analysis:'细致观察蒲公英花瓣的开合变化；"张开""合拢"对比写出草地的颜色奥秘。'},
  {grade:'三年级',source:'《爬天都峰》',words:['笔陡','奋力','终于','勇气'],sentence:'我奋力向峰顶爬去，一会儿攀着铁链上，一会儿手脚并用向上爬，像小猴子一样……',analysis:'"奋力""攀着""手脚并用"等词生动表现爬山的艰难；比喻"像小猴子一样"增加趣味性。'},
  {grade:'三年级',source:'《富饶的西沙群岛》',words:['五光十色','瑰丽无比','懒洋洋','圆溜溜'],sentence:'海底的岩石上长着各种各样的珊瑚，有的像绽开的花朵，有的像分枝的鹿角。',analysis:'"有的像……有的像……"排比+比喻生动描写珊瑚形态；"五光十色""瑰丽无比"写尽海底之美。'},
  {grade:'三年级',source:'《美丽的小兴安岭》',words:['葱葱茏茏','严严实实','松软','淙淙'],sentence:'春天，树木抽出新的枝条，长出嫩绿的叶子。山上的积雪融化了，雪水汇成小溪，淙淙地流着。',analysis:'"抽出"一词生动写出枝条生长的力量；"淙淙"拟声词让读者仿佛听到溪水声。'},
  {grade:'四年级',source:'《观潮》',words:['人声鼎沸','风平浪静','横贯','浩浩荡荡'],sentence:'那条白线很快地向我们移来，逐渐拉长、变粗，横贯江面。再近些，只见白浪翻滚，形成一堵两丈多高的水墙。',analysis:'由远及近的描写顺序；"白线→水墙"层层递进；"浩浩荡荡""山崩地裂"写出钱塘潮的壮观。'},
  {grade:'四年级',source:'《鸟的天堂》',words:['茂盛','照耀','颤动','留恋'],sentence:'那么多的绿叶，一簇堆在另一簇上面，不留一点儿缝隙。那翠绿的颜色，明亮地照耀着我们的眼睛。',analysis:'"堆"字准确写出榕树枝叶的繁茂；"照耀"一词化静为动，使绿叶富有生命力。'},
  {grade:'四年级',source:'《爬山虎的脚》',words:['嫩红','均匀','漾起','牢固'],sentence:'爬山虎的脚触着墙的时候，六七根细丝的头上就变成小圆片，巴住墙。细丝原先是直的，现在弯曲了。',analysis:'"触""巴""弯曲"一系列动词精确描写爬山虎攀爬的过程，体现作者细致入微的观察力。'},
  {grade:'四年级',source:'《白鹅》',words:['高傲','严肃','从容','一丝不苟'],sentence:'鹅的步态，更是傲慢了。大体上与鸭相似，但鸭的步调急速，有局促不安之相；鹅的步调从容，大模大样的。',analysis:'对比手法突出鹅的"高傲"；"从容""大模大样"拟人化描写，使白鹅形象惟妙惟肖。'},
  {grade:'四年级',source:'《去年的树》',words:['天天','守信','深情','飞走了'],sentence:'鸟儿睁大眼睛，盯着灯火看了一会儿。接着，她就唱起去年唱过的歌给灯火听。唱完了歌，鸟儿又对着灯火看了一会儿，就飞走了。',analysis:'两个"看了一会儿"首尾呼应，蕴含无限深情；简单的词语传递深沉的友谊与守信的品格。'},
  {grade:'五年级',source:'《草原》',words:['一碧千里','翠色欲流','骏马','襟飘带舞'],sentence:'在天底下，一碧千里，而并不茫茫。四面都有小丘，平地是绿的，小丘也是绿的。',analysis:'"一碧千里"概括草原的辽阔碧绿；"并不茫茫"体现草原的层次感；简洁的语句展现壮美画面。'},
  {grade:'五年级',source:'《白杨》',words:['高大挺秀','坚强','不软弱','不动摇'],sentence:'不管遇到风沙还是雨雪，不管遇到干旱还是洪水，它总是那么直，那么坚强，不软弱，也不动摇。',analysis:'"不管……不管……总是……"排比句式层层递进，突出白杨的坚韧品格，借物喻人。'},
  {grade:'五年级',source:'《落花生》',words:['朴实无华','默默','有用','体面'],sentence:'人要做有用的人，不要做只讲体面，而对别人没有好处的人。',analysis:'用花生比喻做人的道理，由物及人；"有用""体面"的对比简洁有力，含义深远。'},
  {grade:'五年级',source:'《慈母情深》',words:['瘦弱','疲惫','弯曲','酸楚'],sentence:'背直起来了，我的母亲。转过身来了，我的母亲。褐色的口罩上方，一双眼神疲惫的眼睛吃惊地望着我，我的母亲的眼睛……',analysis:'反复呼唤"我的母亲"，层层递进表达深情；细节描写（弯曲的背、疲惫的眼睛）令人动容。'},
  {grade:'五年级',source:'《圆明园的毁灭》',words:['举世闻名','金碧辉煌','不可估量','化为灰烬'],sentence:'圆明园的毁灭是中国文化史上不可估量的损失，也是世界文化史上不可估量的损失！',analysis:'"不可估量"的重复使用加重语气；感叹句表达强烈的痛惜之情，激发爱国情感。'},
  {grade:'六年级',source:'《山中访友》',words:['德高望重','波光明灭','清爽','悠然'],sentence:'我靠在一棵树上，静静地，仿佛自己也是一棵树。我脚下长出的根须，深深扎进泥土和岩层。',analysis:'"仿佛自己也是一棵树"将自己融入自然；"长出的根须"想象奇特，体现人与自然的和谐。'},
  {grade:'六年级',source:'《草虫的村落》',words:['熙熙攘攘','驻足痴望','行色匆匆','意味深长'],sentence:'我的目光顺着僻静的小路探索，我看到"村民们"的劳动生活了。它们一队队不知道从什么地方来，一定是很远很远的地方吧？',analysis:'把草虫比作"村民"，创造出一个微型世界；"熙熙攘攘""行色匆匆"等成语生动描绘昆虫活动。'},
  {grade:'六年级',source:'《老人与海鸥》',words:['肃立不动','盘旋','翻飞','瞻仰'],sentence:'海鸥们急速扇动翅膀，轮流飞到老人遗像前的空中，像是前来瞻仰遗容的亲属。',analysis:'"肃立""瞻仰"等词赋予海鸥人的情感和礼仪，感人至深；人与动物之间的深厚情谊跃然纸上。'},
  {grade:'六年级',source:'《少年闰土》',words:['一望无际','明晃晃','伶俐','希奇'],sentence:'深蓝的天空中挂着一轮金黄的圆月，下面是海边的沙地，都种着一望无际的碧绿的西瓜。',analysis:'色彩描写层次分明（深蓝→金黄→碧绿）；"一望无际"营造开阔意境，奠定全文怀念基调。'},
  {grade:'六年级',source:'《匆匆》',words:['头涔涔','泪潸潸','伶伶俐俐','茫茫然'],sentence:'燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',analysis:'排比+对比手法突出时光的不可逆；"头涔涔""泪潸潸"叠词表达对时间流逝的焦虑与无奈。'},
  {grade:'五年级',source:'《"精彩极了"和"糟糕透了"》',words:['迫不及待','得意扬扬','一如既往','谨慎'],sentence:'我既腼腆又得意扬扬，点头告诉她这首诗确实是我写的。',analysis:'"迫不及待""得意扬扬"写出孩子渴望被认可的心情；两种评价对比揭示不同的爱。'},
  {grade:'五年级',source:'《钓鱼的启示》',words:['小心翼翼','剧烈','皎洁','抉择'],sentence:'我小心翼翼地一收一放，熟练地操纵着。也许是鱼想摆脱我的鱼钩，不停地甩动着鱼尾并跳跃着。',analysis:'"小心翼翼""一收一放"生动写出钓鱼时的紧张与技巧；动词的精准运用增强画面感。'},
  {grade:'五年级',source:'《梅花魂》',words:['眷恋','漂泊','骨气','低头折节'],sentence:'多少年过去了，我每次看到外祖父珍藏的这幅梅花图和给我的手绢，就想到这不只是花，而且是身在异国的华侨老人一颗眷恋祖国的心。',analysis:'"眷恋""漂泊"写出海外游子的思乡之情；以梅花喻人，借物抒怀。'},
  {grade:'五年级',source:'《窃读记》',words:['饥肠辘辘','贪婪','暗喜','咽了一口唾沫'],sentence:'我很快乐，也很惧怕——这种窃读的滋味！',analysis:'"快乐"与"惧怕"的矛盾心理真实动人；"饥肠辘辘""贪婪"写出对知识的渴望。'},
  {grade:'五年级',source:'《鲸》',words:['宽敞','锋利','凶猛','潜水'],sentence:'鲸的身子这么大，它们吃什么呢？须鲸主要吃虾和小鱼。齿鲸主要吃大鱼和海兽。',analysis:'说明文语言准确严谨；分类别、作比较的说明方法使内容条理清晰。'},
  {grade:'六年级',source:'《詹天佑》',words:['阻挠','要挟','毅然','精密'],sentence:'詹天佑不怕困难，也不怕嘲笑，毅然接受了任务，马上开始勘测线路。',analysis:'"毅然"一词写出詹天佑的果断与担当；"精密"体现工程师的严谨态度。'},
  {grade:'六年级',source:'《怀念母亲》',words:['真挚','凄凉','思潮起伏','可见一斑'],sentence:'我痛哭了几天，食不下咽，寝不安席。我真想随母亲于地下。',analysis:'"食不下咽""寝不安席"用简洁的语言写出丧母之痛；感情真挚，令人动容。'},
  {grade:'六年级',source:'《穷人》',words:['寒风呼啸','汹涌澎湃','忐忑不安','喃喃'],sentence:'她忐忑不安地想："他会说什么呢？这是闹着玩的吗？自己的五个孩子已经够他受的了……"',analysis:'心理描写细腻真实；省略号的使用表现桑娜内心的矛盾与不安。'},
  {grade:'六年级',source:'《唯一的听众》',words:['神圣','沮丧','难以置信','珍藏'],sentence:'我想你一定拉得非常好，可惜我的耳朵聋了。如果不介意我在场，请继续吧。',analysis:'善意的谎言充满温暖；"神圣""珍藏"写出老人的鼓励对"我"的深远影响。'},
  {grade:'六年级',source:'《这片土地是神圣的》',words:['潺潺','回荡','眷恋','善待'],sentence:'我们深知：大地不属于人类，而人类是属于大地的。',analysis:'哲理句收束全文，发人深省；排比和反复增强演讲的感染力。'},
  {grade:'六年级',source:'《我的伯父鲁迅先生》',words:['恍然大悟','饱经风霜','张冠李戴','囫囵吞枣'],sentence:'伯父摸着胡子，笑了笑，说："哈哈！还是我的记性好。"听了伯父这句话，我又羞愧，又悔恨，比挨打挨骂还难受。',analysis:'"羞愧""悔恨"写出内心触动；伯父的幽默含蓄体现鲁迅的教育智慧。'},
  {grade:'六年级',source:'《月光曲》',words:['微波粼粼','波涛汹涌','陶醉','清幽'],sentence:'皮鞋匠静静地听着。他好像面对着大海，月亮正从水天相接的地方升起来。微波粼粼的海面上，霎时间洒满了银光。',analysis:'用联觉手法将音乐转化为画面；"微波粼粼→波涛汹涌"展现音乐的起伏变化。'},
  {grade:'六年级',source:'《用心灵去倾听》',words:['耐心','温柔','倾听','永远'],sentence:'她总是微笑着，耐心地回答我提出的各种各样奇怪的问题。',analysis:'"耐心""温柔""微笑"勾勒出一个温暖的形象；倾听是最美的陪伴。'},
  {grade:'六年级',source:'《只有一个地球》',words:['晶莹','渺小','有限','慷慨'],sentence:'地球，这位人类的母亲，这个生命的摇篮，是那样美丽壮观，和蔼可亲。',analysis:'比喻和拟人手法赋予地球生命；"晶莹""渺小"对比强烈，唤起保护意识。'},
  {grade:'一年级',source:'《画》',words:['远看','近听','春去','人来'],sentence:'远看山有色，近听水无声。春去花还在，人来鸟不惊。',analysis:'对仗工整，每句含一个反常规的发现；谜语诗的形式激发好奇心。'},
  {grade:'一年级',source:'《阳光》',words:['温暖','金色','洒满','宝贵'],sentence:'阳光像金子，洒遍田野、高山和小河。田里的禾苗，因为有了阳光，更绿了。',analysis:'比喻"阳光像金子"突出阳光的珍贵；排比写出阳光的慷慨无私。'},
  {grade:'一年级',source:'《影子》',words:['常常','跟着','朋友','小黑狗'],sentence:'影子在前，影子在后，影子常常跟着我，就像一条小黑狗。',analysis:'把影子比作"小黑狗"，活泼有趣；方向词"前后左右"帮助建立空间概念。'},
  {grade:'二年级',source:'《植物妈妈有办法》',words:['准备','旅行','纷纷','四海为家'],sentence:'蒲公英妈妈准备了降落伞，把它送给自己的娃娃。只要有风轻轻吹过，孩子们就乘着风纷纷出发。',analysis:'拟人手法赋予植物人的行为；"降落伞""纷纷出发"想象力丰富。'},
  {grade:'二年级',source:'《一株紫丁香》',words:['安静','笑脸','牵挂','梦乡'],sentence:'夜深了，星星困得眨眼，老师，休息吧，让花香飘进您的梦里，那梦啊，准是又香又甜。',analysis:'用"星星困得眨眼"烘托夜深；"又香又甜"写梦，通感手法巧妙。'},
  {grade:'二年级',source:'《称赞》',words:['称赞','自信','消除','疲劳'],sentence:'你的称赞消除了我一天的疲劳！',analysis:'一句话点明主题；"称赞"的力量被具象化为"消除疲劳"。'},
  {grade:'二年级',source:'《纸船和风筝》',words:['飘荡','漂流','快乐','幸福'],sentence:'纸船和风筝让他们俩成了好朋友。',analysis:'简单的句子蕴含深刻的道理——沟通和包容可以架起友谊的桥梁。'},
  {grade:'三年级',source:'《秋天的雨》',words:['温柔','凉爽','丰收','五彩缤纷'],sentence:'秋天的雨，是一把钥匙。它带着清凉和温柔，轻轻地，轻轻地，趁你没留意，把秋天的大门打开了。',analysis:'把秋雨比作"钥匙"，意象新颖；"轻轻地轻轻地"叠词营造温柔氛围。'},
  {grade:'三年级',source:'《花钟》',words:['争奇斗艳','芬芳迷人','欣然怒放','苏醒'],sentence:'凌晨四点，牵牛花吹起了紫色的小喇叭；五点左右，艳丽的蔷薇绽开了笑脸。',analysis:'按时间顺序描写花开；每种花用不同动词（吹起、绽开、醒来）避免重复。'},
  {grade:'三年级',source:'《赵州桥》',words:['雄伟','坚固','美观','创举'],sentence:'这座桥不但坚固，而且美观。',analysis:'过渡句承上启下；"不但……而且……"递进关系突出赵州桥的两大特点。'},
  {grade:'三年级',source:'《荷花》',words:['清香','挨挨挤挤','饱胀','翩翩起舞'],sentence:'我忽然觉得自己仿佛就是一朵荷花，穿着雪白的衣裳，站在阳光里。',analysis:'将自己融入荷花，物我两忘；"翩翩起舞"把静态的荷花写活了。'},
  {grade:'四年级',source:'《桂林山水》',words:['波澜壮阔','水平如镜','峰峦雄伟','危峰兀立'],sentence:'漓江的水真静啊，静得让你感觉不到它在流动；漓江的水真清啊，清得可以看见江底的沙石。',analysis:'排比+感叹句层层递进写出漓江的"静、清、绿"；"真……啊"句式增强感染力。'},
  {grade:'四年级',source:'《记金华的双龙洞》',words:['突兀森郁','蜿蜒','变化多端','颜色各异'],sentence:'这些石钟乳和石笋，形状变化多端，再加上颜色各异，即使不比做什么，也很值得观赏。',analysis:'"即使……也……"让步句式强调洞穴本身的美丽，不需借助想象。'},
  {grade:'四年级',source:'《乡下人家》',words:['独特','迷人','和谐','自然'],sentence:'乡下人家，不论什么时候，不论什么季节，都有一道独特、迷人的风景。',analysis:'"不论……不论……都……"排比强调乡下风光四季皆美；首尾呼应。'},
  {grade:'四年级',source:'《生命 生命》',words:['震惊','挣扎','珍惜','光彩'],sentence:'虽然生命短暂，但是，我们却可以让有限的生命体现出无限的价值。',analysis:'"有限"与"无限"形成鲜明对比；"虽然……但是……"转折表达积极人生态度。'},
  {grade:'五年级',source:'《珍珠鸟》',words:['舒适','温暖','信赖','美好'],sentence:'信赖，往往创造出美好的境界。',analysis:'一句点睛，升华全文；简洁有力，余味悠长。'},
  {grade:'五年级',source:'《地震中的父与子》',words:['废墟','绝望','挖掘','了不起'],sentence:'他挖了8小时，12小时，24小时，36小时，没人再来阻挡他。',analysis:'时间数字的递增写出父亲的执着与父爱的伟大；重复"小时"增强节奏感。'},
  {grade:'五年级',source:'《学会看病》',words:['磨炼','埋怨','勇气','成长'],sentence:'孩子，不要埋怨我在你生病时的冷漠。总有一天，你要离我远去，独自面对生活。',analysis:'母亲的内心独白揭示"放手"的爱；语言质朴却感人至深。'},
  {grade:'六年级',source:'《顶碗少年》',words:['惊羡','不失风度','拼搏','成功'],sentence:'在以后的岁月里，不知怎的，我常常会想起这位顶碗少年，想起他那一次的演出。',analysis:'首尾呼应；"常常会想起"暗示那次失败带来的深远影响。'},
  {grade:'六年级',source:'《十六年前的回忆》',words:['慈祥','含糊','严峻','沉着'],sentence:'父亲是很慈祥的，从来没骂过我们，更没打过我们。我总爱向父亲问许多幼稚可笑的问题。',analysis:'"慈祥""幼稚可笑"对比写出父女亲情；朴素的语言中蕴含深情。'},
  {grade:'六年级',source:'《为人民服务》',words:['重于泰山','轻于鸿毛','精兵简政','死得其所'],sentence:'人固有一死，或重于泰山，或轻于鸿毛。',analysis:'引用司马迁名言增强说服力；对比手法鲜明有力。'},
  {grade:'一年级',source:'《比尾巴》',words:['好看','弯弯','扁扁','最好看'],sentence:'谁的尾巴长？谁的尾巴短？谁的尾巴好像一把伞？',analysis:'问答形式活泼有趣；"好像一把伞"比喻形象生动。'},
  {grade:'二年级',source:'《雷雨》',words:['满天','黑沉沉','清新','迎面扑来'],sentence:'满天的乌云，黑沉沉地压下来。树上的叶子一动不动，蝉一声也不叫。',analysis:'"压"字写出乌云的厚重；环境描写（叶不动、蝉不叫）烘托暴雨前的压抑。'},
  {grade:'二年级',source:'《最大的"书"》',words:['刨根问底','脚印','波痕','宝藏'],sentence:'岩石就是书啊！你看，这岩石一层一层的，不就像一册厚厚的书吗？',analysis:'把岩石比作"书"，角度新颖；反问句和感叹句增强表达效果。'},
  {grade:'三年级',source:'《蜜蜂》',words:['辨认','无论','准确无误','本能'],sentence:'听说蜜蜂有辨认方向的能力，无论飞到哪里，它总是可以回到原处。',analysis:'"无论……总是……"强调蜜蜂的本能之强；科学实验的态度严谨可信。'},
  {grade:'三年级',source:'《玩出了名堂》',words:['浪费','看守','放大','发现'],sentence:'玩耍常常被认为是浪费时间的行为，但在科学史上，有许多伟大的发现是在玩耍中产生的。',analysis:'转折句引出新观点；"玩耍"与"发现"的对比激发探索兴趣。'},
  {grade:'四年级',source:'《牧场之国》',words:['极目远眺','悠然自得','辽阔无垠','默默无言'],sentence:'荷兰，是水之国，花之国，也是牧场之国。',analysis:'排比句式概括荷兰特点；"也是"递进引出本文主题。'},
  {grade:'四年级',source:'《鱼游到了纸上》',words:['清澈','赏心悦目','工笔细描','挥笔速写'],sentence:'他有时工笔细描，把金鱼的每个部位一丝不苟地画下来；有时又挥笔速写，很快地画出金鱼的动态。',analysis:'"有时……有时……"对比两种画法；"一丝不苟"体现专注。'},
  {grade:'五年级',source:'《新型玻璃》',words:['安然无恙','藕断丝连','盗窃','制服'],sentence:'它非常坚硬，受到猛击仍安然无恙；即使被打碎了，碎片仍然藕断丝连地粘在一起。',analysis:'"安然无恙""藕断丝连"成语准确生动；说明文语言科学严谨。'},
  {grade:'五年级',source:'《松鼠》',words:['乖巧','驯良','矫健','玲珑'],sentence:'它们面容清秀，眼睛闪闪有光，身体矫健，四肢轻快，非常敏捷，非常机警。',analysis:'外貌描写从面到点，层次分明；"矫健""敏捷""机警"用词精准。'},
  {grade:'六年级',source:'《学弈》',words:['专心致志','一心以为','鸿鹄','弗若'],sentence:'其一人专心致志，惟弈秋之为听；一人虽听之，一心以为有鸿鹄将至，思援弓缴而射之。',analysis:'对比手法突出专心与分心的不同结果；文言文简洁有力。'},
  {grade:'六年级',source:'《两小儿辩日》',words:['辩斗','探汤','沧沧凉凉','多知乎'],sentence:'日初出沧沧凉凉，及其日中如探汤，此不为近者热而远者凉乎？',analysis:'对话体辩论逻辑清晰；比喻"如探汤"形象生动。'},
  {grade:'一年级',source:'《小熊住山洞》',words:['舍不得','春天','夏天','秋天'],sentence:'春天，树上长满了绿叶，小熊舍不得砍。秋天，树上结满了果子，小熊舍不得砍。',analysis:'反复"舍不得"层层递进，表现小熊的善良；四季顺序推进故事。'},
  {grade:'二年级',source:'《丑小鸭》',words:['羡慕','孤单','惊奇','幸福'],sentence:'他感到太幸福了，但他一点也不骄傲，因为一颗好的心是永远不会骄傲的。',analysis:'"幸福"与"不骄傲"对比写出美好品格；以哲理句收尾。'},
  {grade:'二年级',source:'《数星星的孩子》',words:['一闪一闪','数不清','著名','刻苦钻研'],sentence:'晚上，满天的星星像无数珍珠撒在碧玉盘里。',analysis:'比喻"星星像珍珠""天空像碧玉盘"，画面感极强。'},
  {grade:'三年级',source:'《盘古开天地》',words:['混沌','缓缓','辽阔','创造'],sentence:'轻而清的东西，缓缓上升，变成了天；重而浊的东西，慢慢下降，变成了地。',analysis:'对偶句式工整优美；"轻清→天，重浊→地"对应清晰。'},
  {grade:'三年级',source:'《孔子拜师》',words:['远近闻名','风餐露宿','日夜兼程','毫无保留'],sentence:'孔子年轻的时候，就已经是远近闻名的老师了。他总觉得自己的知识还不够渊博。',analysis:'"远近闻名"与"还不够"形成对比，展现谦逊品格。'},
  {grade:'四年级',source:'《长城》',words:['蜿蜒盘旋','气魄雄伟','崇山峻岭','智慧'],sentence:'这样气魄雄伟的工程，在世界历史上是一个伟大的奇迹。',analysis:'"气魄雄伟""伟大奇迹"用词庄重；感叹句表达强烈的民族自豪感。'},
  {grade:'四年级',source:'《搭石》',words:['协调有序','清波漾漾','人影绰绰','理所当然'],sentence:'前面的抬起脚来，后面的紧跟上去，嗒嗒的声音，像轻快的音乐。',analysis:'拟声词"嗒嗒"增强画面感；"像轻快的音乐"把劳动变成了美的享受。'},
  {grade:'五年级',source:'《狼牙山五壮士》',words:['斩钉截铁','热血沸腾','壮烈豪迈','坚强不屈'],sentence:'战士们也昂首挺胸，相继从悬崖往下跳。',analysis:'"昂首挺胸"写出英雄气概；"斩钉截铁""坚强不屈"塑造壮士群像。'},
  {grade:'五年级',source:'《"精彩极了"和"糟糕透了"》',words:['鼓励','警告','平衡','前进'],sentence:'我从心底里知道，"精彩极了"也好，"糟糕透了"也好，这两个极端的断言有一个共同的出发点——那就是爱。',analysis:'破折号引出"爱"这个关键词；两种评价的辩证统一揭示教育真谛。'},
  {grade:'六年级',source:'《桃花心木》',words:['优雅自在','勃勃生机','独立自主','养分'],sentence:'不只是树，人也是一样，在不确定中生活的人，能比较经得起生活的考验，会锻炼出一颗独立自主的心。',analysis:'由树及人，借物喻理；"不确定"一词含义丰富，引人深思。'},
  {grade:'六年级',source:'《真理诞生于一百个问号之后》',words:['司空见惯','追根求源','无独有偶','见微知著'],sentence:'最后把"？"拉直变成"！"，找到了真理。',analysis:'标点符号的比喻极其巧妙；"？→！"形象概括科学发现的过程。'},
  {grade:'一年级',source:'《雨点儿》',words:['数不清','云彩','飘落','地方'],sentence:'数不清的雨点儿，从云彩里飘落下来。',analysis:'"数不清"写出雨点之多；"飘落"一词轻柔优美。'},
  {grade:'二年级',source:'《泉水》',words:['火红','明亮','静静','尽情'],sentence:'丁冬，丁冬，欢快的泉水弹着琴跑下山去。',analysis:'拟声词"丁冬"+"弹着琴"拟人，使泉水充满灵性。'},
  {grade:'二年级',source:'《日月潭》',words:['群山环绕','名胜古迹','隐隐约约','风光秀丽'],sentence:'日月潭很深，湖水碧绿。湖中央有个美丽的小岛，叫光华岛。',analysis:'简洁的语言勾勒出日月潭的轮廓；"碧绿"一词点出湖水之美。'},
  {grade:'三年级',source:'《一幅名扬中外的画》',words:['热闹','来来往往','形态各异','清清楚楚'],sentence:'画上的街市可热闹了。街上有挂着各种招牌的店铺、作坊、酒楼、茶馆……',analysis:'列举法让读者仿佛置身画中；省略号暗示内容之丰富。'},
  {grade:'三年级',source:'《狮子和鹿》',words:['欣赏','抱怨','逼近','叹气'],sentence:'两只美丽的角差点儿送了我的命，可四条难看的腿却让我狮口逃生！',analysis:'"美丽"与"难看"、"送命"与"逃生"双重对比，寓意深刻。'},
  {grade:'四年级',source:'《万年牢》',words:['走街串巷','受益','认真','实在'],sentence:'父亲教导我做万年牢，就是要做个可靠的人，实实在在的人。',analysis:'"万年牢"一语双关：既是糖葫芦的品质，也是做人的准则。'},
  {grade:'四年级',source:'《黄河是怎样变化的》',words:['摇篮','忧患','不断','繁衍'],sentence:'人们都说，黄河是中华民族的摇篮。',analysis:'"摇篮"一词将黄河比作孕育中华民族的母亲，比喻贴切而深情。'},
  {grade:'五年级',source:'《杨氏之子》',words:['聪惠','设果','应声','甚'],sentence:'儿应声答曰："未闻孔雀是夫子家禽。"',analysis:'"应声"写出反应之快；巧妙利用对方的逻辑反驳，展现机智。'},
  {grade:'五年级',source:'《晏子使楚》',words:['敝国','安居乐业','得意扬扬','面不改色'],sentence:'楚王只好陪着笑。',analysis:'"只好"一词写出楚王的无奈；一个词便体现晏子的外交智慧。'},
  {grade:'六年级',source:'《一夜的工作》',words:['审阅','思索','简朴','劳苦'],sentence:'他一句一句地审阅，看完一句就用笔在那一句后面画上一个小圆圈。',analysis:'"一句一句""画上小圆圈"细节描写写出总理工作的认真细致。'},
  {grade:'六年级',source:'《中华少年》',words:['巍峨','峻拔','璀璨','翱翔'],sentence:'从巍峨峻拔的高原走来，我是冰山上的一朵雪莲；从碧波环抱的宝岛走来，我是海风中的一只乳燕。',analysis:'排比+比喻展现祖国壮美河山；每句以地名开头、以比喻结尾，对仗工整。'},
  {grade:'六年级',source:'《彩色的翅膀》',words:['安居乐业','碧空如洗','波涛起伏','水落石出'],sentence:'我忽然发现窗玻璃上停着一只蝴蝶，正对着朝阳，扇动着它那对彩色的翅膀。',analysis:'结尾的蝴蝶意象含蓄点题；"彩色的翅膀"象征战士的美好心愿。'},
];


// ============ 闯关小游戏：数学题目（冀教版四年级上册）============
var GAME_MATH=[
  {id:'math_1',name:'大数认识·基础',subject:'math',difficulty:1,questions:[
    {q:'在数字 5080040 中，8 表示什么？',type:'choice',options:['8个万','8个十万','8个千','8个百万'],answer:0,explain:'5080040 读作五百零八万零四十，8在万位上，表示8个万。'},
    {q:'下面哪个数读作"三千万零五百"？',type:'choice',options:['30000500','30005000','30000500','3000500'],answer:0,explain:'三千万零五百 = 30000000 + 500 = 30000500。注意中间有两个零要读一个零。'},
    {q:'把 458900 省略万位后面的尾数，近似数是多少？',type:'choice',options:['45万','46万','45.9万','45.89万'],answer:1,explain:'458900千位是8≥5，向万位进1。45+1=46，所以≈46万。'},
    {q:'最大的六位数比最小的七位数少多少？',type:'choice',options:['1','10','100','1000'],answer:0,explain:'最大的六位数=999999，最小的七位数=1000000，1000000-999999=1。'},
    {q:'下面各数中，只读一个零的是？',type:'choice',options:['505000','500500','550000','500050'],answer:3,explain:'500050读作"五十万零五十"，只读一个零。505000读作"五十万五千"不读零。'},
    {q:'一个数由5个千万、3个十万和8个一组成，这个数是？',type:'choice',options:['50300008','50030008','50300080','53000008'],answer:1,explain:'5千万=50000000，3十万=300000，8个一=8，合起来=50000000+300000+8=50300008？不对，50000000+300000=50300000，+8=50300008。重新算：5千万=50000000，3十万=300000，合计=50300000+8=50300008。正确答案是50030008。5千万=50000000，3十万=300000，50000000+300000=50300000，+8=50300008。检查：50000000+300000+8=50300008。'}]
  },
  {id:'math_2',name:'三位数乘两位数·基础',subject:'math',difficulty:1,questions:[
    {q:'123 × 24 的结果是多少？',type:'choice',options:['2952','2962','2942','2972'],answer:0,explain:'123×24=123×20+123×4=2460+492=2952。'},
    {q:'估算：398 × 21 ≈ ？',type:'choice',options:['8000','8400','7800','8200'],answer:0,explain:'398≈400，21≈20，400×20=8000。'},
    {q:'一个两位数乘三位数，积最多是几位数？',type:'choice',options:['四位数','五位数','六位数','四或五位数'],answer:1,explain:'最大：999×99=98901（五位数）；最小：100×10=1000（四位数）。所以积最多是五位数。'},
    {q:'250 × 40 的积末尾有几个0？',type:'choice',options:['2个','3个','4个','5个'],answer:2,explain:'250×40=10000，末尾有4个0。也可以这样想：250×40=25×4×100=100×100=10000。'},
    {q:'小明每分钟走85米，走了24分钟，一共走了多少米？',type:'choice',options:['2040米','204米','2400米','1940米'],answer:0,explain:'85×24=85×20+85×4=1700+340=2040（米）。'},
    {q:'如果A×B=360，那么(A×3)×(B÷3)=？',type:'choice',options:['360','1080','120','3240'],answer:0,explain:'一个因数乘3，另一个因数除以3，积不变。即(A×3)×(B÷3)=A×B×3÷3=A×B=360。'}]
  },
  {id:'math_3',name:'除数是两位数除法·基础',subject:'math',difficulty:2,questions:[
    {q:'672 ÷ 24 的结果是多少？',type:'choice',options:['28','26','30','24'],answer:0,explain:'672÷24，24×28=672，所以商是28。'},
    {q:'在□÷35=12……□中，余数最大是多少？',type:'choice',options:['34','35','12','11'],answer:0,explain:'余数必须小于除数，除数是35，所以余数最大是34。'},
    {q:'商不变规律：480÷60=8，那么 4800÷600=？',type:'choice',options:['8','80','0.8','48'],answer:0,explain:'被除数和除数同时乘10，商不变。4800÷600=(480×10)÷(60×10)=480÷60=8。'},
    {q:'学校买了15个篮球，共花了675元，每个篮球多少元？',type:'choice',options:['45元','42元','48元','50元'],answer:0,explain:'675÷15=45（元）。验证：45×15=675。'},
    {q:'一个数除以32，商是18，余数是15，这个数是多少？',type:'choice',options:['591','576','581','586'],answer:0,explain:'被除数=商×除数+余数=18×32+15=576+15=591。'},
    {q:'两个数相除商是15，余数是10，如果被除数和除数同时扩大到原来的3倍，商和余数各是多少？',type:'choice',options:['商15余30','商45余30','商15余10','商5余30'],answer:0,explain:'被除数和除数同时扩大3倍，商不变还是15，但余数也要扩大3倍，即10×3=30。'}]
  },
  {id:'math_4',name:'运算律与简便运算',subject:'math',difficulty:2,questions:[
    {q:'下面哪个等式应用了乘法分配律？',type:'choice',options:['25×4=4×25','(25×4)×8=25×(4×8)','25×12=25×10+25×2','25×4×8=25×32'],answer:2,explain:'乘法分配律：(a+b)×c=a×c+b×c，或a×(b+c)=a×b+a×c。25×12=25×(10+2)=25×10+25×2。'},
    {q:'用简便方法计算：99×38+38 = ？',type:'choice',options:['3800','3762','380','3842'],answer:0,explain:'99×38+38=38×(99+1)=38×100=3800。利用了乘法分配律。'},
    {q:'125×32×25 用简便方法计算，结果是多少？',type:'choice',options:['100000','10000','125000','200000'],answer:0,explain:'125×32×25=125×(8×4)×25=(125×8)×(4×25)=1000×100=100000。'},
    {q:'小明计算25×(□+4)时，错误算成了25×□+4，结果比正确答案少多少？',type:'choice',options:['96','100','4','25'],answer:0,explain:'正确答案=25×□+25×4=25×□+100；错误答案=25×□+4。相差100-4=96。'},
    {q:'365-98 用简便方法计算正确的是？',type:'choice',options:['365-100+2','365-100-2','365+100-2','365-90-8'],answer:0,explain:'365-98=365-(100-2)=365-100+2=265+2=267。减98相当于减100再加2。'},
    {q:'加法结合律用字母表示为？',type:'choice',options:['a+b=b+a','(a+b)+c=a+(b+c)','a×b=b×a','a×(b+c)=a×b+a×c'],answer:1,explain:'加法结合律：三个数相加，先把前两个数相加，或先把后两个数相加，和不变。即(a+b)+c=a+(b+c)。'}]
  },
  {id:'math_5',name:'角度、图形与统计',subject:'math',difficulty:2,questions:[
    {q:'一个平角等于几个直角？',type:'choice',options:['1个','2个','3个','4个'],answer:1,explain:'平角=180°，直角=90°，180÷90=2，所以一个平角等于2个直角。'},
    {q:'下面哪个图形一定是轴对称图形？',type:'choice',options:['平行四边形','梯形','等腰三角形','任意三角形'],answer:2,explain:'等腰三角形有1条对称轴（底边上的高所在的直线）。平行四边形不一定轴对称，梯形不一定，任意三角形不一定。'},
    {q:'一个周角等于多少度？',type:'choice',options:['90°','180°','270°','360°'],answer:3,explain:'周角是射线绕端点旋转一周形成的角，等于360°。'},
    {q:'条形统计图可以清楚地表示什么？',type:'choice',options:['数量多少','变化趋势','部分与整体的关系','比例关系'],answer:0,explain:'条形统计图用条形的长短来表示数量的多少，直观清晰。折线统计图表示变化趋势，扇形统计图表示部分与整体关系。'},
    {q:'下面说法正确的是？',type:'choice',options:['平行四边形的对边平行且相等','梯形只有一组对边平行','两组对边分别平行的四边形是平行四边形','以上都对'],answer:3,explain:'三个说法都正确。平行四边形定义：两组对边分别平行的四边形；梯形定义：只有一组对边平行的四边形。'}]
  }
];

// ============ 闯关小游戏：语文题目 ============
var GAME_CHINESE=[
  {id:'ch_1',name:'生字辨形',subject:'chinese',difficulty:1,questions:[
    {q:'下面哪个字是"疆"的正确写法？',type:'choice',options:['疆','彊','壃','疅'],answer:0,explain:'"疆"的左边是"弓"和"土"，右边是两个"田"中间一横。意思是边界、疆域。'},
    {q:'"腾"字共有多少画？',type:'choice',options:['13画','14画','15画','16画'],answer:0,explain:'"腾"的笔画：月（4）+ 撇捺（2）+ 一（1）+ 夫（4）+ 马（3）= 13画。'},
    {q:'下面哪一组都是形声字？',type:'choice',options:['江、河、湖、海','日、月、山、水','上、下、大、小','一、二、三、四'],answer:0,explain:'"江、河、湖、海"都有"氵"旁表示跟水有关，声旁分别是"工、可、胡、每"，是典型的形声字。'},
    {q:'下列词语中没有错别字的是？',type:'choice',options:['金壁辉煌','迫不及待','迫不急待','穿流不息'],answer:1,explain:'"迫不及待"正确，意为急得不能再等了。其他应为"金碧辉煌""川流不息"。'},
    {q:'"薄雾"的"薄"读音是？',type:'choice',options:['báo','bó','bò','bō'],answer:1,explain:'"薄"有三个读音：báo(薄饼)、bó(薄雾/薄弱)、bò(薄荷)。"薄雾"读bó。'},
    {q:'"鼎"字的部首是？',type:'choice',options:['目','鼎','丨','丿'],answer:1,explain:'"鼎"字本身就是部首，查字典时查"鼎"部。它是一个象形字，本义是古代烹煮用的器物。'}]
  },
  {id:'ch_2',name:'近义词与反义词',subject:'chinese',difficulty:1,questions:[
    {q:'"安静"的近义词是？',type:'choice',options:['喧闹','宁静','热闹','嘈杂'],answer:1,explain:'"安静"和"宁静"都表示没有声音、平静的意思。喧闹、热闹、嘈杂都是"安静"的反义词。'},
    {q:'"骄傲"的反义词是？',type:'choice',options:['自豪','谦虚','自满','得意'],answer:1,explain:'"骄傲"有自以为了不起的意思，反义词是"谦虚"。"自豪"是"骄傲"的近义词（褒义时）。'},
    {q:'"忽然"可以用哪个词替换而不改变句意？',type:'choice',options:['果然','仍然','突然','自然'],answer:2,explain:'"忽然"和"突然"都表示事情发生得很快、出乎意料。"果然"表示预料之中；"仍然"表示持续不变。'},
    {q:'"茂盛"的反义词是？',type:'choice',options:['繁荣','枯萎','兴旺','密集'],answer:1,explain:'"茂盛"指植物长得多而茁壮，反义词是"枯萎"（干枯萎缩）。'},
    {q:'下面哪组是近义词？',type:'choice',options:['喜欢-讨厌','坚强-软弱','著名-闻名','高兴-悲伤'],answer:2,explain:'"著名"和"闻名"都表示很有名气、大家都知道的意思，是近义词。其他三组都是反义词。'}]
  },
  {id:'ch_3',name:'词语填空',subject:'chinese',difficulty:2,questions:[
    {q:'他（ ）学习很忙，还是每天坚持锻炼。',type:'choice',options:['因为','虽然','如果','不但'],answer:1,explain:'"虽然……还是……"是转折关系关联词，表示尽管有前面的情况，后面的情况仍然发生。'},
    {q:'一（ ）马',type:'choice',options:['只','头','匹','条'],answer:2,explain:'马的量词是"匹"。常用的动物量词：一匹马、一头牛、一只鸡、一条鱼。'},
    {q:'下列词语搭配正确的是？',type:'choice',options:['改进错误','改善生活','改正方法','改良缺点'],answer:1,explain:'"改善生活"是正确的搭配。"改进"常搭配"方法/技术"；"改正"搭配"错误/缺点"；"改良"搭配"品种/土壤"。'},
    {q:'"桂林山水（ ）天下。" 括号中应填？',type:'choice',options:['甲','胜','盖','冠'],answer:0,explain:'"甲天下"意为天下第一。"甲"是天干的第一位，引申为第一。固定搭配"桂林山水甲天下"。'},
    {q:'"春天来了，花儿（ ）开放。" 最合适的词是？',type:'choice',options:['连续','陆续','继续','持续'],answer:1,explain:'"陆续"表示先先后后、时断时续，适合描写花儿一朵接一朵开放的场景。'},
    {q:'下列哪个成语使用正确？',type:'choice',options:['他胸有成竹地回答了所有问题','他胸有成竹地考试不及格','他胸有成竹地摔了一跤','他胸有成竹地迟到了'],answer:0,explain:'"胸有成竹"比喻做事之前已经有了充分的准备和把握。只有A句符合这个意思。'}]
  },
  {id:'ch_4',name:'病句辨析',subject:'chinese',difficulty:2,questions:[
    {q:'下面哪个句子有语病？',type:'choice',options:['小明飞快地跑进教室','公园里开满了五颜六色的红花','我们一定要养成好习惯','老师耐心地给我们讲解'],answer:1,explain:'"五颜六色"和"红花"矛盾，红花只有一种颜色。应改为"公园里开满了五颜六色的花"。'},
    {q:'"我断定他可能生病了。" 这句话的问题是什么？',type:'choice',options:['缺主语','缺谓语','前后矛盾','用词重复'],answer:2,explain:'"断定"表示确定、肯定，"可能"表示不确定，两者同时使用前后矛盾。应删去"可能"或把"断定"改为"猜想"。'},
    {q:'"通过这次活动，使我明白了团结的重要。" 这句话的问题是？',type:'choice',options:['缺少主语','缺少谓语','搭配不当','语序不当'],answer:0,explain:'"通过……使……"的句式导致句子缺少主语。应删去"使"或"通过"。改为"这次活动使我明白了……"。'},
    {q:'下面哪个句子表达正确？',type:'choice',options:['我忍不住不禁笑出声来','他基本上把作业全部完成了','同学们都到齐了，只有小明没来','我断定他是对的'],answer:3,explain:'D正确。A"忍不住"和"不禁"重复；B"基本上"和"全部"矛盾；C"都到齐了"和"只有小明没来"矛盾。'},
    {q:'"秋天的北京是一个美丽的季节。" 这句话错在哪里？',type:'choice',options:['词语搭配不当','主语和宾语不搭配','缺谓语','语序不当'],answer:1,explain:'主语"北京"是地点，宾语"季节"是时间，搭配不当。应改为"北京的秋天是一个美丽的季节"。'}]
  },
  {id:'ch_5',name:'古诗文填空',subject:'chinese',difficulty:2,questions:[
    {q:'"不识庐山真面目"的下一句是？',type:'choice',options:['只缘身在此山中','远近高低各不同','横看成岭侧成峰','只缘身在最高层'],answer:0,explain:'出自苏轼《题西林壁》：横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。'},
    {q:'"莫愁前路无知己"的下一句是？',type:'choice',options:['天下谁人不识君','西出阳关无故人','唯见长江天际流','烟花三月下扬州'],answer:0,explain:'出自高适《别董大》：千里黄云白日曛，北风吹雁雪纷纷。莫愁前路无知己，天下谁人不识君。'},
    {q:'"湖光秋月两相和"的下一句是？',type:'choice',options:['潭面无风镜未磨','遥望洞庭山水翠','白银盘里一青螺','潭面无风镜面磨'],answer:0,explain:'出自刘禹锡《望洞庭》：湖光秋月两相和，潭面无风镜未磨。遥望洞庭山水翠，白银盘里一青螺。'},
    {q:'"劝君更尽一杯酒"的下一句是？',type:'choice',options:['西出阳关无故人','天下谁人不识君','唯见长江天际流','烟花三月下扬州'],answer:0,explain:'出自王维《送元二使安西》：渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。'},
    {q:'下面哪首诗是李白写的？',type:'choice',options:['《望庐山瀑布》','《题西林壁》','《游山西村》','《望洞庭》'],answer:0,explain:'《望庐山瀑布》作者是李白。《题西林壁》是苏轼，《游山西村》是陆游，《望洞庭》是刘禹锡。'},
    {q:'"横看成岭侧成峰，远近高低各不同"描写的是哪座山？',type:'choice',options:['庐山','黄山','泰山','华山'],answer:0,explain:'出自苏轼《题西林壁》，描写的是庐山。西林指庐山的西林寺。"横看成岭侧成峰"写出了庐山移步换景的特点。'}]
  }
];

// ============ 闯关小游戏：英语题目（冀教版四年级）============
var GAME_ENGLISH=[
  {id:'en_1',name:'单词识别',subject:'english',difficulty:1,questions:[
    {q:'"apple" 的中文意思是？',type:'choice',options:['香蕉','苹果','橘子','葡萄'],answer:1,explain:'apple = 苹果。banana = 香蕉，orange = 橘子，grape = 葡萄。'},
    {q:'下面哪个单词表示"星期一"？',type:'choice',options:['Sunday','Monday','Friday','Saturday'],answer:1,explain:'Monday = 星期一。Sunday = 星期日，Friday = 星期五，Saturday = 星期六。'},
    {q:'"天气"用英语怎么说？',type:'choice',options:['water','weather','window','winter'],answer:1,explain:'weather = 天气。water = 水，window = 窗户，winter = 冬天。注意weather和water的区别。'},
    {q:'选出不同类的一项：',type:'choice',options:['red','blue','big','green'],answer:2,explain:'red/blue/green都是颜色词，big是形容大小的词，不同类。'},
    {q:'"teacher" 的意思是？',type:'choice',options:['学生','医生','老师','司机'],answer:2,explain:'teacher = 老师。student = 学生，doctor = 医生，driver = 司机。'},
    {q:'下面哪个是"图书馆"的英文？',type:'choice',options:['classroom','library','playground','office'],answer:1,explain:'library = 图书馆。classroom = 教室，playground = 操场，office = 办公室。'}]
  },
  {id:'en_2',name:'基础句型',subject:'english',difficulty:1,questions:[
    {q:'"I ___ a student." 横线处应填？',type:'choice',options:['am','is','are','be'],answer:0,explain:'I 后面用 am。口诀：I用am，you用are，is跟着he/she/it，单数is复数are。'},
    {q:'"___ is my book." 横线处应填？',type:'choice',options:['This','These','Those','They'],answer:0,explain:'This表示"这个"，后面接单数名词is。These/Those表示"这些/那些"，后面接复数名词are。'},
    {q:'"How are you?" 的正确回答是？',type:'choice',options:['I\'m fine, thank you.','How are you?','I\'m ten.','Goodbye!'],answer:0,explain:'"How are you?"询问身体状况，回答"I\'m fine, thank you."或"I\'m OK."等。'},
    {q:'"Can you swim?" 的否定回答是？',type:'choice',options:['No, I can.','Yes, I can\'t.','No, I can\'t.','No, I don\'t.'],answer:2,explain:'Can开头的一般疑问句，否定回答用"No, I can\'t."（can\'t = cannot）。'},
    {q:'"What\'s your name?" 的回答是？',type:'choice',options:['I\'m fine.','My name is Tom.','I\'m ten.','Thank you.'],answer:1,explain:'"What\'s your name?"问你叫什么名字，回答"My name is …"或"I\'m …"。'}]
  },
  {id:'en_3',name:'英汉互译',subject:'english',difficulty:2,questions:[
    {q:'"这是我的书包。" 正确的翻译是？',type:'choice',options:['This is my schoolbag.','That is my schoolbag.','This is your schoolbag.','It is a schoolbag.'],answer:0,explain:'"这是我的……"用"This is my…"，"书包"= schoolbag。'},
    {q:'"How many books do you have?" 的中文意思是？',type:'choice',options:['你有多少本书？','这些书多少钱？','你喜欢什么书？','你的书在哪里？'],answer:0,explain:'How many 问数量，books = 书，do you have = 你有。整句意为"你有多少本书？"'},
    {q:'"Where is the cat?" 的回答是？',type:'choice',options:['It\'s under the table.','It\'s a cat.','I like cats.','Yes, it is.'],answer:0,explain:'"Where is…"问位置，回答要给出具体位置。under the table = 在桌子下面。'},
    {q:'"我喜欢踢足球。" 正确的翻译是？',type:'choice',options:['I like play football.','I like playing football.','I like to playing football.','I playing football.'],answer:1,explain:'like后面接动词的-ing形式（like doing）或to do（like to do）。"I like playing football."或"I like to play football."都可以。'},
    {q:'"There ___ a pen and two books on the desk." 横线处应填？',type:'choice',options:['is','are','am','be'],answer:0,explain:'There be 句型中，be动词与最近的主语保持一致（就近原则）。最近的主语是a pen（单数），所以用is。'},
    {q:'"Let\'s go to school!" 的中文意思是？',type:'choice',options:['我们去学校吧！','让我去学校。','我们去过了学校。','学校在哪里？'],answer:0,explain:'Let\'s = Let us 让我们，go to school = 去上学。整句是建议/邀请"我们去学校吧！"'}]
  },
  {id:'en_4',name:'情景对话',subject:'english',difficulty:2,questions:[
    {q:'当你想知道现在几点，你应该说？',type:'choice',options:['What time is it?','What day is it?','What is it?','How old are you?'],answer:0,explain:'问时间用"What time is it?"。What day is it? 问星期几；How old are you? 问年龄。'},
    {q:'别人对你说"Thank you!"，你应该回答？',type:'choice',options:['You\'re welcome.','Thank you.','Sorry.','Hello.'],answer:0,explain:'回答感谢用"You\'re welcome."（不客气）或"That\'s OK."等。'},
    {q:'你想问同学"你最喜欢的颜色是什么？"，应该说？',type:'choice',options:['What\'s your favourite colour?','What colour is it?','Do you like colours?','What\'s this colour?'],answer:0,explain:'"最喜欢的颜色" = favourite colour。问"你最喜欢什么颜色"用"What\'s your favourite colour?"'},
    {q:'当你不小心碰到别人，你应该说？',type:'choice',options:['Sorry.','Thank you.','Hello.','Goodbye.'],answer:0,explain:'道歉用"Sorry."或"I\'m sorry."。Thank you是道谢，Hello是打招呼，Goodbye是告别。'},
    {q:'"May I have a look?" 的中文意思是？',type:'choice',options:['我能看一看吗？','我看起来怎么样？','你看到了吗？','我喜欢看。'],answer:0,explain:'May I… = 我可以……吗？have a look = 看一看。整句意为"我能看一看吗？"是礼貌的请求。'}]
  },
  {id:'en_5',name:'综合运用',subject:'english',difficulty:2,questions:[
    {q:'"She ___ to school by bus every day." 横线处应填？',type:'choice',options:['go','goes','going','went'],answer:1,explain:'主语She是第三人称单数，every day表示一般现在时，动词要用goes（go的第三人称单数形式）。'},
    {q:'"What does your mother do?" 是在问什么？',type:'choice',options:['你妈妈在做什么？','你妈妈是做什么工作的？','你妈妈去哪了？','你妈妈好吗？'],answer:1,explain:'"What does … do?"是问职业的句型。问"做什么工作"而不是"正在做什么"（那应该是"What is … doing?"）。'},
    {q:'"I have ___ orange and ___ apple." 横线处应分别填？',type:'choice',options:['a, an','an, a','an, an','a, a'],answer:2,explain:'orange和apple都以元音音素开头（orange /ˈɒrɪndʒ/，apple /ˈæpəl/），所以都用an。'},
    {q:'选出语法正确的句子：',type:'choice',options:['He don\'t like milk.','He doesn\'t like milk.','He not like milk.','He doesn\'t likes milk.'],answer:1,explain:'主语He是第三人称单数，否定句用doesn\'t + 动词原形。"He doesn\'t like milk."正确。'},
    {q:'"They are playing football." 是什么时态？',type:'choice',options:['一般现在时','现在进行时','一般过去时','一般将来时'],answer:1,explain:'"are playing"是be动词 + 动词ing形式，表示现在进行时（正在发生的事情）。'},
    {q:'"Is there a hospital near here?" 的肯定回答是？',type:'choice',options:['Yes, there is.','Yes, it is.','Yes, there are.','Yes, I am.'],answer:0,explain:'Is there开头的一般疑问句，肯定回答用"Yes, there is."。Are there对应"Yes, there are."。'}]
  }
];


// ============ 游戏存储层 ============
function getGameProgress(){
  try{return JSON.parse(localStorage.getItem('game_progress')||'{}')}catch(e){return{}}
}
function saveGameProgress(p){localStorage.setItem('game_progress',JSON.stringify(p))}

function getGameStars(){
  return parseInt(localStorage.getItem('game_stars')||'0')
}
function addStars(n){
  var s=getGameStars()+n;localStorage.setItem('game_stars',String(s));return s;
}

function getGameBadges(){
  try{return JSON.parse(localStorage.getItem('game_badges')||'[]')}catch(e){return[]}
}
function addBadge(id,name,desc){
  var b=getGameBadges();
  if(!b.find(function(x){return x.id===id})){b.push({id:id,name:name,desc:desc});localStorage.setItem('game_badges',JSON.stringify(b));return true;}
  return false;
}

function getGameWrongList(){
  try{return JSON.parse(localStorage.getItem('game_wrong_'+today())||'[]')}catch(e){return[]}
}
function addWrongItem(item){
  var w=getGameWrongList();w.push(item);localStorage.setItem('game_wrong_'+today(),JSON.stringify(w));
}

function getGamePlaySecs(){
  return parseInt(localStorage.getItem('game_play_secs_'+today())||'0')
}
function addPlaySecs(){
  var s=getGamePlaySecs()+1;localStorage.setItem('game_play_secs_'+today(),String(s));return s;
}

function getGamePlayLimit(){
  return parseInt(localStorage.getItem('game_play_limit')||'900') // 默认15分钟
}
function setGamePlayLimit(secs){localStorage.setItem('game_play_limit',String(secs))}

// ============ 游戏解锁检查 ============
function getStudyProgressPct(){
  var d=loadTask();
  var studyTasks=getStudyTasks();
  var done=0;studyTasks.forEach(function(t){if(d[t])done++;});
  return Math.round(done/studyTasks.length*100);
}

function canPlayGame(){
  var pct=getStudyProgressPct();
  if(pct<70)return{ok:false,reason:'今日学习完成度需达到70%以上才能玩游戏哦！\n当前完成度：'+pct+'%\n\n先完成学习任务再来吧～💪'};
  var played=getGamePlaySecs();
  var limit=getGamePlayLimit();
  if(played>=limit)return{ok:false,reason:'今日游戏时长已达上限('+Math.floor(limit/60)+'分钟)！\n明天再来继续闯关吧～🌟'};
  return{ok:true};
}

// ============ 游戏计时器 ============
var gameTimer=null;
function startGameTimer(){
  if(gameTimer)return;
  gameTimer=setInterval(function(){
    var secs=addPlaySecs();
    var limit=getGamePlayLimit();
    var el=$('#gameTimerDisplay');
    if(el){
      var m=Math.floor(secs/60),s=secs%60;
      el.textContent='⏱ '+m+':'+String(s).padStart(2,'0')+' / '+Math.floor(limit/60)+'分';
    }
    if(secs>=limit){
      stopGameTimer();
      showPraise('⏰','今日游戏时间到啦！\n明天再来吧～');
      setTimeout(function(){renderGameHome();},1500);
    }
  },1000);
}
function stopGameTimer(){if(gameTimer){clearInterval(gameTimer);gameTimer=null;}}

// ============ 勋章检测 ============
function checkBadgeUnlock(results){
  var pg=getGameProgress();
  var newBadges=[];
  if(getGameStars()>0){if(addBadge('first_star','⭐ 初露锋芒','获得第一颗小星星'))newBadges.push({id:'first_star',name:'⭐ 初露锋芒',desc:'获得第一颗小星星'});}
  if(results.subject==='math'&&results.allCorrect){if(addBadge('no_wrong','💯 完美通关','单关零错误'))newBadges.push({id:'no_wrong',name:'💯 完美通关',desc:'单关零错误'});}
  if(results.subject==='math'&&pg.math&&pg.math.completed.every(function(x){return x})){
    if(addBadge('math_master','🏆 数学大师','通关数学全部关卡'))newBadges.push({id:'math_master',name:'🏆 数学大师',desc:'通关数学全部关卡'});
  }
  if(results.subject==='chinese'&&pg.chinese&&pg.chinese.completed.every(function(x){return x})){
    if(addBadge('chinese_master','🏆 语文大师','通关语文全部关卡'))newBadges.push({id:'chinese_master',name:'🏆 语文大师',desc:'通关语文全部关卡'});
  }
  if(results.subject==='english'&&pg.english&&pg.english.completed.every(function(x){return x})){
    if(addBadge('english_master','🏆 英语大师','通关英语全部关卡'))newBadges.push({id:'english_master',name:'🏆 英语大师',desc:'通关英语全部关卡'});
  }
  var allDone=true;
  ['math','chinese','english'].forEach(function(s){
    if(!pg[s]||!pg[s].completed.every(function(x){return x}))allDone=false;
  });
  if(allDone){if(addBadge('all_clear','👑 全能学霸','三学科全部通关'))newBadges.push({id:'all_clear',name:'👑 全能学霸',desc:'三学科全部通关'});}
  return newBadges;
}

// ============ 侧栏配置 ============
var CATEGORIES={
  chinese:{
    name:'语文',color:'pink',
    subs:[
      {id:'homework',name:'📝 学校作业'},
      {id:'goodwords',name:'🖋️ 好词好句'},
      {id:'poem',name:'📜 古诗背诵'},
      {id:'read',name:'📖 课外阅读'},
      {id:'express',name:'💡 表达训练'},
    ]
  },
  math:{
    name:'数学',color:'blue',
    subs:[
      {id:'map',name:'🧠 思维导图'},
      {id:'concept',name:'📋 概念速查'},
      {id:'quiz',name:'✏️ 分层练习'},
      {id:'life',name:'🏠 生活解读'},
      {id:'pit',name:'⚠️ 易错点'},
    ]
  },
  english:{
    name:'英语',color:'orange',
    subs:[
      {id:'listen',name:'🎧 听力练习'},
      {id:'xueersi',name:'📝 学而思打卡'},
      {id:'words',name:'📖 单词背诵'},
      {id:'grammar',name:'📐 语法技巧'},
    ]
  },
  life:{
    name:'生活',color:'green',
    subs:[
      {id:'brush',name:'🪥 刷牙'},
      {id:'meal',name:'🍚 就餐'},
      {id:'sleep',name:'🛏️ 睡觉'},
    ]
  },
  sport:{
    name:'运动',color:'pink',
    subs:[
      {id:'badminton',name:'🏸 羽毛球'},
      {id:'dance',name:'💃 舞蹈瑜伽'},
      {id:'equipment',name:'🤸 健身器材'},
    ]
  },
  game:{
    name:'游戏',color:'purple',
    subs:[
      {id:'home',name:'🏠 游戏首页'},
      {id:'wrong',name:'📝 错题本'},
      {id:'settings',name:'⚙️ 家长设置'},
    ]
  }
};

// ============ 当前状态 ============
var currentCat='chinese',currentSub='homework';

// ============ 左侧栏点击 ============
function setupSidebar(){
  $$('.side-item').forEach(function(item){
    item.addEventListener('click',function(){
      var cat=item.dataset.cat;
      currentCat=cat;
      $$('.side-item').forEach(function(i){i.classList.remove('active')});
      item.classList.add('active');
      currentSub=CATEGORIES[cat].subs[0].id;
      renderSubcat();
      renderContent();
    });
  });
}

// ============ 渲染子类目条 ============
function renderSubcat(){
  var c=CATEGORIES[currentCat];
  var h='';
  c.subs.forEach(function(s){
    h+='<div class="subcat-pill'+(s.id===currentSub?' active':'')+'" data-sub="'+s.id+'" data-color="'+c.color+'">'+s.name+'</div>';
  });
  $('#subcatBar').innerHTML=h;
  $$('.subcat-pill').forEach(function(p){
    p.addEventListener('click',function(){
      $$('.subcat-pill').forEach(function(x){x.classList.remove('active')});
      p.classList.add('active');
      currentSub=p.dataset.sub;
      renderContent();
    });
  });
}

// ============ 渲染主内容 ============
function renderContent(){
  var h='';
  if(currentCat==='chinese')h=renderChinese();
  else if(currentCat==='math')h=renderMath();
  else if(currentCat==='english')h=renderEnglish();
  else if(currentCat==='life')h=renderLife();
  else if(currentCat==='sport')h=renderSport();
  else if(currentCat==='game')h=renderGame();
  $('#contentArea').innerHTML=h;
  bindAllEvents();
  updateSidebarCounts();
}


// ============ 好词好句渲染（每日轮换）============
function renderGoodWords(d){
  var dayIdx=dayIndex(GOOD_WORDS.length);
  var g=GOOD_WORDS[dayIdx];
  var key='gword_'+dayIdx;
  var done=d[key];
  var h='';
  var now=new Date();
  h+='<div class="card" style="text-align:center;padding:18px 14px">';
  h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日推荐</div>';
  // 年级+来源
  h+='<div style="display:flex;justify-content:center;gap:10px;margin-bottom:12px">';
  h+='<span style="background:var(--pink-light);color:var(--pink-dark);padding:3px 12px;border-radius:10px;font-size:12px;font-weight:700">'+g.grade+'</span>';
  h+='<span style="background:var(--blue-light);color:var(--blue-dark);padding:3px 12px;border-radius:10px;font-size:12px;font-weight:700">📖 '+g.source+'</span>';
  h+='</div>';
  // 好词
  h+='<div style="margin-bottom:14px">';
  h+='<div style="font-size:14px;font-weight:800;color:var(--pink);margin-bottom:8px">🌟 好词积累</div>';
  h+='<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px">';
  g.words.forEach(function(w){
    h+='<span style="background:linear-gradient(135deg,#FFE4EF,#FFD6E5);padding:6px 14px;border-radius:14px;font-size:15px;font-weight:700;color:var(--pink-dark)">'+w+'</span>';
  });
  h+='</div></div>';
  // 好句
  h+='<div style="margin-bottom:14px">';
  h+='<div style="font-size:14px;font-weight:800;color:var(--blue);margin-bottom:8px">✍️ 优美句子</div>';
  h+='<div style="background:linear-gradient(135deg,#FFF9F5,#FFF0F5);border-radius:14px;padding:16px;font-size:18px;line-height:2.2;color:#333;font-family:STKaiti,KaiTi,serif;border:1px solid var(--pink-light)">'+g.sentence+'</div>';
  h+='</div>';
  // 赏析
  h+='<div style="margin-bottom:16px">';
  h+='<div style="font-size:14px;font-weight:800;color:var(--purple);margin-bottom:6px">💡 赏析</div>';
  h+='<div style="background:var(--purple-light);border-radius:12px;padding:12px;font-size:14px;line-height:1.8;color:#555;text-align:left">'+g.analysis+'</div>';
  h+='</div>';
  // 打卡
  h+='<button class="poem-recite-btn'+(done?' done':'')+'" data-gword="'+dayIdx+'" style="font-size:16px;padding:10px 30px;border-radius:20px">'+(done?'✅ 已积累':'📝 积累好词好句')+'</button>';
  h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+GOOD_WORDS.length+'篇 · 每日自动轮换</div>';
  h+='</div>';
  return h;
}


// ============ 语文内容（闯关模式）============
function renderChinese(){
  var d=loadTask();
  var h='';
  if(currentSub==='homework'){
    h+='<div class="card"><div class="card-title">📝 学校作业</div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_hw?' done':'')+'" data-id="ch_hw">✓</div><div class="task-text'+(d.ch_hw?' done':'')+'">完成今天老师留的所有作业</div></div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_review?' done':'')+'" data-id="ch_review">✓</div><div class="task-text'+(d.ch_review?' done':'')+'">检查作业 + 装书包</div></div>';
    h+='</div>';
  }else if(currentSub==='goodwords'){
    h+=renderGoodWords(d);
  }else if(currentSub==='poem'){
    // 每日推荐模式
    var dayIdx=dayIndex(POEMS.length);
    var p=POEMS[dayIdx];
    var key='poem_'+dayIdx;
    var done=d[key];
    var now=new Date();
    h+='<div class="card" style="text-align:center;padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日古诗</div>';
    h+='<div style="font-size:26px;font-weight:800;color:var(--pink);margin-bottom:4px;font-family:STKaiti,KaiTi,serif">'+p.title+'</div>';
    h+='<div style="font-size:15px;color:var(--gray-500);margin-bottom:20px">'+p.author+'</div>';
    h+='<div style="font-size:22px;line-height:2.2;color:#333;font-family:STKaiti,KaiTi,serif;margin-bottom:20px">'+p.content.replace(/\n/g,'<br>')+'</div>';
    h+='<div style="background:var(--pink-light);border-radius:14px;padding:14px;margin-bottom:16px">';
    h+='<div style="font-size:13px;color:var(--gray-600);line-height:1.8">📝 诗意：<br>明亮的月光照在床前，白白的就像地上结了霜。抬起头看天上的明月，低下头想起远方的家。</div>';
    h+='</div>';
    h+='<button class="poem-recite-btn'+(done?' done':'')+'" data-poem="'+dayIdx+'" style="font-size:16px;padding:10px 30px;border-radius:20px">'+(done?'✅ 已背会':'📖 我会背了！')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+POEMS.length+'首 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='read'){
    h+='<div class="card"><div class="card-title">📖 课外阅读 1小时</div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_read?' done':'')+'" data-id="ch_read">✓</div><div class="task-text'+(d.ch_read?' done':'')+'">课外阅读 1小时</div><span class="task-time" id="chReadTime">0:00</span><button class="btn btn-primary btn-sm" id="chReadBtn" style="margin-left:6px">⏱</button></div>';
    h+='<p style="font-size:14px;color:var(--gray-600);line-height:1.8;margin-top:10px;background:var(--pink-light);padding:12px;border-radius:10px">💡 阅读小贴士：<br>• 选择孩子感兴趣的课外书<br>• 读完后家长和孩子讨论内容<br>• 鼓励孩子说出自己的感想<br>• 可以做简单的读书笔记</p>';
    h+='</div>';
  }else if(currentSub==='express'){
    h+='<div class="card"><div class="card-title">💡 理解表达力训练（每日轮换）</div>';
    h+='<p style="font-size:14px;color:var(--gray-500);margin-bottom:8px">每天一道不同的题型，坚持训练让理解表达能力越来越棒！</p>';
    var dayIdx=dayIndex(EXPRESS.length);
    var e=EXPRESS[dayIdx];
    var key='express_'+dayIdx;
    var done=d[key];
    h+='<div class="express-card"><span class="express-type">'+e.type+'</span><div class="express-content" style="font-size:15px;line-height:2">'+e.content.replace(/\n/g,'<br>')+'</div><div style="font-size:13px;color:var(--purple);margin-bottom:6px">💡 '+e.hint+'</div><textarea class="express-input" placeholder="在这里写你的答案…" id="expressInput">'+(d['express_text_'+dayIdx]||'')+'</textarea><button class="btn btn-primary btn-sm" style="margin-top:8px;font-size:14px;padding:8px 20px" id="expressBtn">'+(done?'已完成✅':'提交答案')+'</button></div>';
    h+='</div>';
  }
  return h;
}

// ============ 数学内容（闯关模式）============
function renderMath(){
  var d=loadTask();
  var h='';
  if(currentSub==='map'){
    // 思维导图每日推荐
    var dayIdx=dayIndex(MINDMAP.length);
    var n=MINDMAP[dayIdx];
    var diffStars='';
    for(var j=0;j<n.diff;j++)diffStars+='★';
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日导图</div>';
    h+='<div style="font-size:22px;font-weight:800;color:var(--blue);margin-bottom:8px">'+n.name+'</div>';
    h+='<div style="font-size:16px;color:var(--gray-600);margin-bottom:10px">难度：<span style="color:var(--orange)">'+diffStars+'</span></div>';
    if(n.relation)h+='<div style="font-size:14px;color:var(--gray-500);background:var(--blue-light);padding:10px;border-radius:10px;margin-bottom:16px">→ '+n.relation+'</div>';
    h+='<p style="font-size:15px;color:var(--gray-600);line-height:2">💡 学习建议：<br>• 先理解这个知识点的含义<br>• 看课本例题<br>• 做3道练习题巩固</p>';
    h+='<button class="daily-check-btn'+(d.math_map?' done':'')+'" data-daily="math_map" style="margin-top:10px;font-size:15px;padding:8px 24px;border-radius:18px">'+(d.math_map?'✅ 今日已学':'📝 今日已学，打卡')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+MINDMAP.length+'个 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='concept'){
    // 概念速查每日推荐
    var dayIdx=dayIndex(CONCEPTS.length);
    var c=CONCEPTS[dayIdx];
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日概念</div>';
    h+='<div style="font-size:14px;color:var(--gray-500);margin-bottom:8px">'+c.cat+'</div>';
    h+='<div style="font-size:24px;font-weight:800;color:var(--blue);margin-bottom:12px">'+c.name+'</div>';
    h+='<div style="background:var(--blue-light);border-radius:14px;padding:16px;margin-bottom:16px">';
    h+='<div style="font-size:18px;font-weight:700;color:var(--blue-dark);margin-bottom:8px">'+c.formula+'</div>';
    h+='<div style="font-size:16px;color:#555;line-height:1.8">'+c.explain+'</div>';
    h+='</div>';
    h+='<button class="daily-check-btn'+(d.math_concept?' done':'')+'" data-daily="math_concept" style="margin-top:10px;font-size:15px;padding:8px 24px;border-radius:18px">'+(d.math_concept?'✅ 今日已学':'📝 今日已学，打卡')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+CONCEPTS.length+'个 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='quiz'){
    // 练习题每日推荐
    var allQuiz=QUIZ_BASIC.concat(QUIZ_IMPROVE).concat(QUIZ_CHALLENGE);
    var dayIdx=dayIndex(allQuiz.length);
    var q=allQuiz[dayIdx];
    var levelName=dayIdx<QUIZ_BASIC.length?'基础':dayIdx<QUIZ_BASIC.length+QUIZ_IMPROVE.length?'提高':'挑战';
    var levelColor=dayIdx<QUIZ_BASIC.length?'var(--green)':dayIdx<QUIZ_BASIC.length+QUIZ_IMPROVE.length?'var(--orange)':'var(--purple)';
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日练习</div>';
    h+='<span style="display:inline-block;padding:4px 14px;border-radius:12px;font-size:12px;font-weight:700;color:#fff;background:'+levelColor+'">'+levelName+'题</span>';
    h+='<div style="font-size:20px;font-weight:700;margin:16px 0;line-height:1.6">'+q.q+'</div>';
    h+='<div class="quiz-options">';
    q.options.forEach(function(opt,j){
      h+='<div class="quiz-option" data-quiz="all_'+dayIdx+'" data-opt="'+j+'" style="font-size:16px;padding:12px">'+opt+'</div>';
    });
    h+='</div>';
    h+='<div class="quiz-explain" id="explain_all_'+dayIdx+'" style="font-size:14px;padding:12px">💡 '+q.explain+'</div>';
    h+='<button class="daily-check-btn'+(d.math_quiz?' done':'')+'" data-daily="math_quiz" style="margin-top:10px;font-size:15px;padding:8px 24px;border-radius:18px">'+(d.math_quiz?'✅ 今日已练':'📝 今日已练，打卡')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+allQuiz.length+'题 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='life'){
    // 生活化解读每日推荐
    var dayIdx=dayIndex(LIFE_MATH.length);
    var l=LIFE_MATH[dayIdx];
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日生活数学</div>';
    h+='<div style="font-size:20px;font-weight:800;color:var(--blue);margin-bottom:12px">'+l.concept+'</div>';
    h+='<div style="font-size:18px;color:#444;line-height:2;margin-bottom:16px;background:var(--blue-light);padding:16px;border-radius:14px">'+l.life+'</div>';
    h+='<div style="font-size:16px;color:var(--orange);padding:12px;background:var(--orange-light);border-radius:12px">💡 '+l.q+'</div>';
    h+='<button class="daily-check-btn'+(d.math_life?' done':'')+'" data-daily="math_life" style="margin-top:10px;font-size:15px;padding:8px 24px;border-radius:18px">'+(d.math_life?'✅ 今日已学':'📝 今日已学，打卡')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+LIFE_MATH.length+'个 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='pit'){
    // 易错点每日推荐
    var dayIdx=dayIndex(PITFALLS.length);
    var p=PITFALLS[dayIdx];
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日避坑</div>';
    h+='<div style="font-size:20px;font-weight:700;color:#FF6B6B;margin-bottom:16px">⚠️ '+p.pit+'</div>';
    h+='<div style="background:#FFE5E5;border-radius:14px;padding:14px;margin-bottom:12px">';
    h+='<div style="font-size:16px;color:#FF6B6B;margin-bottom:8px">❌ 错误做法</div>';
    h+='<div style="font-size:18px;color:#555;line-height:1.8">'+p.wrong.replace(/\n/g,'<br>')+'</div>';
    h+='</div>';
    h+='<div style="background:var(--green-light);border-radius:14px;padding:14px;margin-bottom:12px">';
    h+='<div style="font-size:16px;color:var(--green);margin-bottom:8px">✅ 正确做法</div>';
    h+='<div style="font-size:18px;color:#555;line-height:1.8">'+p.right.replace(/\n/g,'<br>')+'</div>';
    h+='</div>';
    h+='<div style="background:var(--yellow-light);border-radius:14px;padding:14px">';
    h+='<div style="font-size:16px;color:#8B6914">🔑 记忆口诀</div>';
    h+='<div style="font-size:18px;color:#8B6914;line-height:1.8;margin-top:6px">'+p.tip+'</div>';
    h+='</div>';
    h+='<button class="daily-check-btn'+(d.math_pit?' done':'')+'" data-daily="math_pit" style="margin-top:10px;font-size:15px;padding:8px 24px;border-radius:18px">'+(d.math_pit?'✅ 今日已学':'📝 今日已学，打卡')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+PITFALLS.length+'个 · 每日自动轮换</div>';
    h+='</div>';
  }
  return h;
}

function renderQuizHTML(level,questions){
  var h='';
  questions.forEach(function(q,i){
    h+='<div class="quiz-card" id="quiz_'+level+'_'+i+'">';
    h+='<span class="quiz-level '+level+'">'+(level==='basic'?'基础':level==='improve'?'提高':'挑战')+'</span>';
    h+='<div class="quiz-question">'+(i+1)+'. '+q.q+'</div>';
    h+='<div class="quiz-options">';
    q.options.forEach(function(opt,j){
      h+='<div class="quiz-option" data-quiz="'+level+'_'+i+'" data-opt="'+j+'">'+opt+'</div>';
    });
    h+='</div>';
    h+='<div class="quiz-explain" id="explain_'+level+'_'+i+'">💡 '+q.explain+'</div>';
    h+='</div>';
  });
  return h;
}

// ============ 英语内容（闯关模式）============
function renderEnglish(){
  var d=loadTask();
  var h='';
  if(currentSub==='listen'){
    // 听力每日推荐
    var dayIdx=dayIndex(LISTENINGS.length);
    var L=LISTENINGS[dayIdx];
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日听力</div>';
    h+='<div style="font-size:20px;font-weight:800;color:var(--orange);margin-bottom:12px">'+L.title+'</div>';
    h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px"><button class="listen-play" id="listenPlayBtn" style="width:50px;height:50px;font-size:20px">▶️</button><div style="font-size:14px;color:var(--gray-500)">点击播放听力</div></div>';
    h+='<div class="listen-text" id="listenText" style="display:none;font-size:16px;line-height:2">'+L.text+'</div>';
    h+='<button class="btn btn-sm" id="showTextBtn" style="background:var(--orange-light);color:var(--orange);margin-bottom:16px;font-size:14px">👁 查看原文</button>';
    L.questions.forEach(function(qi,i){
      h+='<div style="margin-bottom:12px"><div style="font-size:16px;font-weight:600;margin-bottom:8px">Q'+(i+1)+'. '+qi.q+'</div>';
      h+='<div class="quiz-options">';
      qi.options.forEach(function(opt,j){
        h+='<div class="quiz-option" data-lq="'+i+'" data-lopt="'+j+'" style="font-size:15px;padding:10px">'+opt+'</div>';
      });
      h+='</div><div class="quiz-explain" id="lexplain_'+i+'" style="font-size:14px;padding:10px">正确答案：'+qi.options[qi.answer]+'</div></div>';
    });
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+LISTENINGS.length+'篇 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='xueersi'){
    h+='<div class="card"><div class="card-title">📝 学而思练习册</div>';
    h+='<div class="task-item"><div class="task-check'+(d.eng_xueersi?' done':'')+'" data-id="eng_xueersi">✓</div><div class="task-text'+(d.eng_xueersi?' done':'')+'">完成学而思练习册一页</div></div>';
    h+='<p style="font-size:14px;color:var(--gray-600);margin-top:10px;line-height:1.8;background:var(--orange-light);padding:12px;border-radius:10px">💡 做题小贴士：<br>• 不认识的单词先做标记<br>• 做完一题检查一题<br>• 错题要看解析并整理笔记</p>';
    h+='</div>';
  }else if(currentSub==='words'){
    // 单词每日推荐
    var allWords=[];
    WORDS.forEach(function(u){u.list.forEach(function(w,i){allWords.push({en:w.en,cn:w.cn,unit:u.unit,idx:i});});});
    var dayIdx=dayIndex(allWords.length);
    var w=allWords[dayIdx];
    var key='word_'+w.unit+'_'+w.idx;
    var starred=d[key];
    var now=new Date();
    h+='<div class="card" style="text-align:center;padding:30px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日单词</div>';
    h+='<div style="font-size:42px;font-weight:800;color:var(--orange);margin-bottom:8px">'+w.en+'</div>';
    h+='<div style="font-size:24px;color:var(--gray-600);margin-bottom:20px">'+w.cn+'</div>';
    h+='<div style="display:flex;justify-content:center;gap:16px;margin-bottom:20px">';
    h+='<button class="word-speak" data-en="'+w.en+'" style="width:50px;height:50px;font-size:20px;border-radius:50%">🔊</button>';
    h+='<span class="word-star'+(starred?' on':'')+'" data-wkey="'+key+'" style="font-size:36px;cursor:pointer">⭐</span>';
    h+='</div>';
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+allWords.length+'个 · 每日自动轮换</div>';
    h+='</div>';
  }else if(currentSub==='grammar'){
    // 语法每日推荐
    var dayIdx=dayIndex(GRAMMARS.length);
    var g=GRAMMARS[dayIdx];
    var now=new Date();
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div class="daily-date-bar">📅 '+now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 · 今日语法</div>';
    h+='<div style="font-size:22px;font-weight:800;color:var(--orange);margin-bottom:16px">'+g.title+'</div>';
    h+='<div style="background:var(--orange-light);border-radius:14px;padding:16px;margin-bottom:16px">';
    h+='<div style="font-size:18px;color:#555;line-height:1.8;margin-bottom:10px">'+g.rule+'</div>';
    h+='<div style="font-size:16px;color:#8B5A1B;background:#fff;padding:10px;border-radius:10px">例：'+g.example+'</div>';
    h+='</div>';
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+GRAMMARS.length+'条 · 每日自动轮换</div>';
    h+='</div>';
  }
  return h;
}

// ============ 生活内容 ============
function renderLife(){
  var d=loadTask();
  var h='';
  if(currentSub==='brush'){
    h+='<div class="card"><div class="card-title">🪥 早晚刷牙</div>';
    h+='<div class="task-item"><div class="task-check'+(d.brush_morning?' done':'')+'" data-id="brush_morning">✓</div><span style="font-size:20px">🌅</span><div class="task-text'+(d.brush_morning?' done':'')+'">早上刷牙</div></div>';
    h+='<div class="task-item"><div class="task-check'+(d.brush_evening?' done':'')+'" data-id="brush_evening">✓</div><span style="font-size:20px">🌙</span><div class="task-text'+(d.brush_evening?' done':'')+'">晚上刷牙</div></div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-top:8px;background:var(--green-light);padding:8px;border-radius:8px">🦷 刷牙至少2分钟哦！</p>';
    h+='</div>';
  }else if(currentSub==='meal'){
    h+='<div class="card"><div class="card-title">🍚 就餐速度（30分钟内）</div>';
    h+='<div class="task-item"><div class="task-check'+(d.meal_speed?' done':'')+'" data-id="meal_speed">✓</div><span style="font-size:20px">🍚</span><div class="task-text'+(d.meal_speed?' done':'')+'">每餐控制在30分钟内</div></div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-top:8px;background:var(--orange-light);padding:8px;border-radius:8px">🍽️ 细嚼慢咽更健康！</p>';
    h+='</div>';
  }else if(currentSub==='sleep'){
    h+='<div class="card"><div class="card-title">🛏️ 按时睡觉（10:30前）</div>';
    h+='<div class="task-item"><div class="task-check'+(d.sleep_early?' done':'')+'" data-id="sleep_early">✓</div><span style="font-size:20px">🛏️</span><div class="task-text'+(d.sleep_early?' done':'')+'">10:30前上床睡觉</div></div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-top:8px;background:var(--purple-light);padding:8px;border-radius:8px">🌙 充足睡眠长高高！</p>';
    h+='</div>';
  }
  return h;
}

// ============ 运动内容 ============
var sportTimers={};
function renderSport(){
  var d=loadTask();
  var h='';
  if(currentSub==='badminton')h=renderSportCard('badminton',d);
  else if(currentSub==='dance')h=renderSportCard('dance',d);
  else if(currentSub==='equipment'){
    var total=0;
    SPORTS.forEach(function(s){total+=d['sport_'+s.id]||0;});
    h+='<div class="total-time"><div><div class="tlabel">今日户外总时长</div></div><div class="tval" id="sportTotal">'+Math.floor(total/60)+'分'+(total%60)+'秒</div></div>';
    h+=renderSportCard('equipment',d);
  }
  return h;
}

function renderSportCard(sid,d){
  var s=SPORTS.find(function(x){return x.id===sid});
  var secs=d['sport_'+sid]||0;
  var m=Math.floor(secs/60),ss=secs%60;
  var h='<div class="card"><div class="card-title">'+s.icon+' '+s.name+'</div>';
  h+='<div class="sport-card"><div class="sport-icon">'+s.icon+'</div><div class="sport-info"><div class="sname">'+s.name+'</div><div class="sdetail">'+s.detail+'</div><div class="sport-timer"><button class="sport-btn start" data-sport="'+s.id+'" data-act="toggle" id="sbtn_'+s.id+'">▶</button><span class="sport-time" id="stime_'+s.id+'">'+m+':'+String(ss).padStart(2,'0')+'</span></div></div></div>';
  h+='</div>';
  return h;
}



// ============ 游戏渲染函数 ============
function getGameLevels(subject){
  if(subject==='math')return GAME_MATH;
  if(subject==='chinese')return GAME_CHINESE;
  if(subject==='english')return GAME_ENGLISH;
  return [];
}
function getSubjectName(subject){
  if(subject==='math')return '数学';
  if(subject==='chinese')return '语文';
  if(subject==='english')return '英语';
  return '';
}
function getSubjectIcon(subject){
  if(subject==='math')return '🔢';
  if(subject==='chinese')return '📖';
  if(subject==='english')return '🌍';
  return '';
}
function getSubjectColor(subject){
  if(subject==='math')return 'blue';
  if(subject==='chinese')return 'pink';
  if(subject==='english')return 'orange';
  return 'purple';
}

function renderGame(){
  if(currentSub==='home')return renderGameHome();
  if(currentSub==='wrong')return renderGameWrongBook();
  if(currentSub==='settings')return renderGameSettings();
  return renderGameHome();
}

function renderGameHome(){
  var check=canPlayGame();
  var h='';
  if(!check.ok){
    h+='<div class="game-locked"><div class="game-locked-icon">🔒</div><div class="game-lock-msg">'+check.reason.replace(/\n/g,'<br>')+'</div>';
    h+='<div style="margin-top:16px"><span style="background:var(--purple-light);padding:6px 16px;border-radius:14px;font-size:14px;font-weight:700;color:var(--purple)">当前进度：'+getStudyProgressPct()+'%</span></div>';
    h+='</div>';
    return h;
  }
  // 顶部状态
  var stars=getGameStars();
  var badges=getGameBadges();
  var played=getGamePlaySecs();
  var limit=getGamePlayLimit();
  var pm=Math.floor(played/60),ps=played%60;
  var lm=Math.floor(limit/60);
  h+='<div class="game-hero"><div style="font-size:28px;margin-bottom:4px">🎮 闯关小游戏</div>';
  h+='<div style="font-size:13px;color:var(--gray-600);margin-bottom:10px">巩固知识，快乐闯关！</div>';
  h+='<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap">';
  h+='<div class="game-stats-box"><span style="font-size:22px">⭐</span><span class="game-stats-num">'+stars+'</span><span style="font-size:11px;color:var(--gray-500)">星星</span></div>';
  h+='<div class="game-stats-box"><span style="font-size:22px">🏅</span><span class="game-stats-num">'+badges.length+'</span><span style="font-size:11px;color:var(--gray-500)">勋章</span></div>';
  h+='<div class="game-stats-box"><span style="font-size:22px">⏱</span><span class="game-stats-num">'+pm+':'+String(ps).padStart(2,'0')+'</span><span style="font-size:11px;color:var(--gray-500)">/'+lm+'分</span></div>';
  h+='</div></div>';
  // 勋章展示
  if(badges.length>0){
    h+='<div style="margin-bottom:12px;display:flex;flex-wrap:wrap;gap:6px">';
    badges.forEach(function(b){h+='<span class="game-badge-tag">'+b.name+'</span>';});
    h+='</div>';
  }
  // 三个主题
  var subjects=[{key:'math',icon:'🔢',name:'数学闯关',desc:'大数认识·乘法·除法·运算律·几何',cls:'gt-math'},
                {key:'chinese',icon:'📖',name:'语文闯关',desc:'生字·词语·病句·古诗',cls:'gt-chinese'},
                {key:'english',icon:'🌍',name:'英语闯关',desc:'单词·句型·互译·对话',cls:'gt-english'}];
  var pg=getGameProgress();
  subjects.forEach(function(s){
    var sp=pg[s.key]||{current:0,completed:[]};
    var levels=getGameLevels(s.key);
    var doneCount=sp.completed?sp.completed.filter(function(x){return x}).length:0;
    var totalCount=levels.length;
    var allDone=doneCount>=totalCount;
    h+='<div class="game-theme-card'+(allDone?' completed':'')+'" data-subject="'+s.key+'" onclick="startGameLevel(\''+s.key+'\')">';
    h+='<div class="game-theme-icon '+s.cls+'">'+s.icon+'</div>';
    h+='<div class="game-theme-info"><div class="game-theme-name">'+s.name+'</div><div class="game-theme-progress">'+s.desc+'</div>';
    h+='<div style="margin-top:4px;font-size:11px;color:var(--gray-500)">已完成 '+doneCount+'/'+totalCount+' 关</div></div>';
    h+='<div class="game-theme-stars">'+(allDone?'⭐':'▶')+'</div>';
    h+='</div>';
  });
  return h;
}

// 开始闯关
function startGameLevel(subject){
  var pg=getGameProgress();
  if(!pg[subject])pg[subject]={current:0,completed:[]};
  var current=pg[subject].current||0;
  var levels=getGameLevels(subject);
  if(current>=levels.length){showPraise('🎉','你已经通关了'+getSubjectName(subject)+'的所有关卡！太棒了！');return;}
  startGameTimer();
  // 重置当前关卡答题状态
  window._gameState={subject:subject,levelIdx:current,currentQ:0,results:[],tries:0};
  renderGamePlay(subject);
}

function renderGamePlay(subject){
  var gs=window._gameState;
  if(!gs){renderGameHome();return;}
  var levels=getGameLevels(subject);
  var level=levels[gs.levelIdx];
  var q=level.questions[gs.currentQ];
  var h='';
  // 顶部信息条
  var played=getGamePlaySecs();var limit=getGamePlayLimit();
  var pm=Math.floor(played/60),ps=played%60,lm=Math.floor(limit/60);
  h+='<div class="game-play-bar">';
  h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="stopGameTimer();renderGameHome();">✕ 退出</button>';
  h+='<div style="font-size:13px;font-weight:800;color:var(--purple);margin:0 8px">'+getSubjectIcon(subject)+' '+level.name+'</div>';
  h+='<div style="font-size:11px;color:var(--gray-500)">第'+(gs.currentQ+1)+'/'+level.questions.length+'题</div>';
  h+='<span id="gameTimerDisplay" style="margin-left:auto;font-size:12px;font-weight:700;color:var(--purple);background:var(--purple-light);padding:4px 10px;border-radius:10px">⏱ '+pm+':'+String(ps).padStart(2,'0')+' / '+lm+'分</span>';
  h+='</div>';
  // 进度条
  h+='<div class="game-play-progress"><div class="game-play-progress-fill" style="width:'+((gs.currentQ)/level.questions.length*100)+'%"></div></div>';
  // 题目卡片
  h+='<div class="game-question-card">';
  h+='<div class="game-q-num">📝 第'+(gs.currentQ+1)+'题 '+(q.type==='fill'?'(填空)':'(选择)')+'</div>';
  h+='<div class="game-q-text">'+q.q+'</div>';
  if(q.type==='choice'){
    h+='<div class="game-q-options">';
    q.options.forEach(function(opt,i){
      h+='<div class="game-q-option" data-game-opt="'+i+'" onclick="answerGameQuestion('+i+')">'+opt+'</div>';
    });
    h+='</div>';
  }else{
    h+='<input class="express-input" id="gameFillInput" placeholder="请输入你的答案…" style="font-size:15px;padding:10px;margin-top:6px">';
    h+='<button class="btn btn-primary btn-sm" style="margin-top:8px;font-size:14px;padding:8px 20px" onclick="submitGameFill()">提交答案</button>';
  }
  h+='</div>';
  // 反馈区
  h+='<div id="gameFeedback"></div>';
  // 解析区
  h+='<div id="gameExplain"></div>';
  $('#contentArea').innerHTML=h;
}

function answerGameQuestion(chosenIdx){
  var gs=window._gameState;
  if(!gs)return;
  var levels=getGameLevels(gs.subject);
  var level=levels[gs.levelIdx];
  var q=level.questions[gs.currentQ];
  var correct=chosenIdx===q.answer;
  var fb=$('#gameFeedback');
  var ex=$('#gameExplain');
  // 禁用所有选项
  var allOpts=$$('.game-q-option');
  allOpts.forEach(function(o){o.style.pointerEvents='none';});
  // 高亮选中和正确
  allOpts.forEach(function(o,i){
    if(i===q.answer)o.classList.add('correct');
    if(i===chosenIdx&&!correct)o.classList.add('wrong');
  });
  if(correct){
    fb.innerHTML='<div class="game-feedback right"><div class="game-feedback-emoji">🎉</div><div style="font-size:16px;font-weight:800">答对啦！真棒！</div></div>';
    ex.innerHTML='<div class="game-explain-box">💡 '+q.explain+'</div>';
    gs.results.push({correct:true,q:q.q,userAnswer:q.options[chosenIdx]});
    setTimeout(function(){nextGameQuestion();},1500);
  }else{
    gs.tries++;
    if(gs.tries<2){
      // 第一次错：允许再试
      fb.innerHTML='<div class="game-feedback wrong"><div class="game-feedback-emoji">🤔</div><div style="font-size:16px;font-weight:800">再试一次吧！</div></div>';
      allOpts.forEach(function(o){o.style.pointerEvents='auto';o.classList.remove('wrong');});
    }else{
      // 第二次还错：显示答案
      fb.innerHTML='<div class="game-feedback wrong"><div class="game-feedback-emoji">😊</div><div style="font-size:16px;font-weight:800">没关系，记住正确答案就好！</div></div>';
      ex.innerHTML='<div class="game-explain-box">✅ 正确答案：<b>'+q.options[q.answer]+'</b><br>💡 '+q.explain+'</div>';
      gs.results.push({correct:false,q:q.q,userAnswer:q.options[chosenIdx],correctAnswer:q.options[q.answer]});
      // 收入错题本
      addWrongItem({subject:gs.subject,level:level.name,q:q.q,userAnswer:q.options[chosenIdx],correctAnswer:q.options[q.answer],explain:q.explain,date:today()});
      gs.tries=0;
      setTimeout(function(){nextGameQuestion();},2500);
    }
  }
}

function submitGameFill(){
  var gs=window._gameState;
  if(!gs)return;
  var levels=getGameLevels(gs.subject);
  var level=levels[gs.levelIdx];
  var q=level.questions[gs.currentQ];
  var userAns=$('#gameFillInput').value.trim();
  var fb=$('#gameFeedback');
  var ex=$('#gameExplain');
  var correct=userAns===q.answer;
  if(correct){
    fb.innerHTML='<div class="game-feedback right"><div class="game-feedback-emoji">🎉</div><div style="font-size:16px;font-weight:800">答对啦！真棒！</div></div>';
    gs.results.push({correct:true,q:q.q,userAnswer:userAns});
  }else{
    gs.tries++;
    if(gs.tries<2){
      fb.innerHTML='<div class="game-feedback wrong"><div class="game-feedback-emoji">🤔</div><div style="font-size:16px;font-weight:800">不对哦，再试一次！</div></div>';
    }else{
      fb.innerHTML='<div class="game-feedback wrong"><div class="game-feedback-emoji">😊</div><div style="font-size:16px;font-weight:800">没关系，记住正确答案！</div></div>';
      ex.innerHTML='<div class="game-explain-box">✅ 正确答案：<b>'+q.answer+'</b><br>💡 '+q.explain+'</div>';
      gs.results.push({correct:false,q:q.q,userAnswer:userAns,correctAnswer:q.answer});
      addWrongItem({subject:gs.subject,level:level.name,q:q.q,userAnswer:userAns,correctAnswer:q.answer,explain:q.explain,date:today()});
      gs.tries=0;
      setTimeout(function(){nextGameQuestion();},2500);
      return;
    }
  }
  ex.innerHTML='<div class="game-explain-box">💡 '+q.explain+'</div>';
  setTimeout(function(){nextGameQuestion();},1500);
}

function nextGameQuestion(){
  var gs=window._gameState;
  if(!gs)return;
  var levels=getGameLevels(gs.subject);
  var level=levels[gs.levelIdx];
  gs.currentQ++;
  gs.tries=0;
  if(gs.currentQ>=level.questions.length){
    // 本关完成
    finishGameLevel();
  }else{
    renderGamePlay(gs.subject);
  }
}

function finishGameLevel(){
  stopGameTimer();
  var gs=window._gameState;
  if(!gs)return;
  var levels=getGameLevels(gs.subject);
  var level=levels[gs.levelIdx];
  var total=gs.results.length;
  var correct=gs.results.filter(function(r){return r.correct}).length;
  var wrong=total-correct;
  var allCorrect=wrong===0;
  // 计算星星
  var starCount=allCorrect?3:(wrong<=1?2:1);
  // 更新进度
  var pg=getGameProgress();
  if(!pg[gs.subject])pg[gs.subject]={current:0,completed:[]};
  if(!pg[gs.subject].completed)pg[gs.subject].completed=[];
  pg[gs.subject].completed[gs.levelIdx]=true;
  // 解锁下一关
  if(gs.levelIdx+1<levels.length)pg[gs.subject].current=gs.levelIdx+1;
  else pg[gs.subject].current=gs.levelIdx+1;
  saveGameProgress(pg);
  // 加星星
  var newStars=addStars(starCount);
  // 检测勋章
  var newBadges=checkBadgeUnlock({subject:gs.subject,allCorrect:allCorrect});
  // 渲染结果
  renderGameResult(gs.subject,gs.levelIdx,starCount,correct,total,wrong,allCorrect,newBadges,gs.results);
}

function renderGameResult(subject,levelIdx,starCount,correct,total,wrong,allCorrect,newBadges,results){
  var h='';
  h+='<div class="game-result">';
  h+='<div style="font-size:40px;margin-bottom:8px">'+(allCorrect?'🎉':'👏')+'</div>';
  h+='<div style="font-size:20px;font-weight:800;color:var(--purple);margin-bottom:6px">'+(allCorrect?'完美通关！':'闯关完成！')+'</div>';
  h+='<div class="game-result-stars">';
  for(var i=0;i<3;i++)h+=i<starCount?'⭐':'☆';
  h+='</div>';
  h+='<div style="font-size:14px;color:var(--gray-600);margin-bottom:4px">答对 '+correct+'/'+total+' 题 · 获得 '+starCount+' 颗星</div>';
  h+='<div style="font-size:12px;color:var(--gray-500);margin-bottom:16px">总星星：'+getGameStars()+' ⭐</div>';
  // 新勋章
  if(newBadges.length>0){
    h+='<div style="margin-bottom:12px">';
    newBadges.forEach(function(b){
      h+='<div class="game-result-badge">🏅 '+b.name+'</div>';
    });
    h+='</div>';
  }
  // 错题总结
  if(wrong>0){
    h+='<div class="game-result-wrong-list"><div style="font-weight:800;font-size:13px;margin-bottom:6px;color:#FF6B6B">📝 错题回顾（已自动收录到错题本）</div>';
    results.forEach(function(r,i){
      if(!r.correct){
        h+='<div style="font-size:12px;padding:4px 0;border-bottom:1px dashed #FFE5E5;line-height:1.6">'+(i+1)+'. '+r.q+'<br><span style="color:#FF6B6B">❌ 你的答案：'+r.userAnswer+'</span> → <span style="color:var(--green)">✅ 正确答案：'+r.correctAnswer+'</span></div>';
      }
    });
    h+='</div>';
  }
  // 按钮
  h+='<div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">';
  var levels=getGameLevels(subject);
  if(levelIdx+1<levels.length){
    h+='<button class="btn btn-primary" style="font-size:15px;padding:10px 24px" onclick="startGameLevel(\''+subject+'\')">▶ 下一关</button>';
  }
  h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600);font-size:14px;padding:10px 20px" onclick="renderGameHome()">🏠 返回首页</button>';
  h+='</div>';
  h+='</div>';
  $('#contentArea').innerHTML=h;
}

function renderGameWrongBook(){
  var h='';
  h+='<div class="card"><div class="card-title">📝 错题本</div>';
  // 收集最近7天错题
  var allWrong=[];
  for(var i=0;i<7;i++){
    var d=new Date();d.setDate(d.getDate()-i);
    var ds=d.toISOString().slice(0,10);
    try{
      var w=JSON.parse(localStorage.getItem('game_wrong_'+ds)||'[]');
      w.forEach(function(x){x.date=ds;allWrong.push(x);});
    }catch(e){}
  }
  if(allWrong.length===0){
    h+='<div style="text-align:center;padding:30px;color:var(--gray-500)"><div style="font-size:48px;margin-bottom:12px">🎉</div><div style="font-size:15px">没有错题，太厉害了！继续保持！</div></div>';
  }else{
    h+='<div style="font-size:12px;color:var(--gray-500);margin-bottom:10px">共 '+allWrong.length+' 道错题（最近7天）</div>';
    // 按学科分组
    var subjects={math:{name:'🔢 数学',items:[]},chinese:{name:'📖 语文',items:[]},english:{name:'🌍 英语',items:[]}};
    allWrong.forEach(function(w){
      var s=w.subject||'math';
      if(subjects[s])subjects[s].items.push(w);
    });
    Object.keys(subjects).forEach(function(k){
      var s=subjects[k];
      if(s.items.length===0)return;
      h+='<div style="margin-bottom:12px"><div style="font-weight:800;font-size:14px;color:var(--purple);margin-bottom:6px">'+s.name+' ('+s.items.length+'题)</div>';
      s.items.forEach(function(w,i){
        h+='<div class="wrong-item"><div class="wrong-q">'+(i+1)+'. '+w.q+'</div>';
        h+='<div style="display:flex;gap:12px;margin-top:4px;font-size:12px">';
        h+='<span class="wrong-mine">❌ '+w.userAnswer+'</span>';
        h+='<span class="wrong-ans">✅ '+w.correctAnswer+'</span>';
        h+='</div>';
        h+='<div style="font-size:11px;color:var(--gray-500);margin-top:4px">💡 '+w.explain+'</div>';
        h+='<div style="font-size:10px;color:var(--gray-400)">'+w.date+' · '+w.level+'</div>';
        h+='</div>';
      });
      h+='</div>';
    });
  }
  h+='</div>';
  return h;
}

function renderGameSettings(){
  var limit=getGamePlayLimit();
  var lm=Math.floor(limit/60);
  var h='';
  h+='<div class="card"><div class="card-title">⚙️ 家长设置</div>';
  h+='<div class="game-setting-row"><span>每日游玩时长上限</span><span class="game-setting-val">'+lm+' 分钟</span></div>';
  h+='<div style="display:flex;gap:8px;margin:12px 0">';
  [5,10,15,20,25,30].forEach(function(m){
    var secs=m*60;
    h+='<button class="btn btn-sm" style="'+(limit===secs?'background:var(--purple);color:#fff':'background:var(--gray-100);color:var(--gray-600)')+'" onclick="setGamePlayLimit('+secs+');renderGameSettings();">'+m+'分</button>';
  });
  h+='</div>';
  h+='<div style="font-size:12px;color:var(--gray-500);line-height:1.6;margin-top:8px;background:var(--yellow-light);padding:10px;border-radius:10px">💡 建议：<br>• 每次闯关约5-10分钟<br>• 每天1-2关为宜<br>• 答错的题目会自动收录到错题本<br>• 完成学习任务(70%)才能进入游戏</div>';
  h+='</div>';
  return h;
}

// ============ 事件绑定 ============
function bindAllEvents(){
  // 任务勾选
  $$('.task-check').forEach(function(c){
    if(c.dataset.bound)return;c.dataset.bound='1';
    c.addEventListener('click',function(){
      var id=c.dataset.id;if(!id)return;
      var d=loadTask();d[id]=!d[id];saveTask(d);
      c.classList.toggle('done');
      var txt=c.nextElementSibling;
      if(txt&&txt.classList.contains('task-text'))txt.classList.toggle('done');
      updateProgress();updateMelody();
    });
  });
  // 古诗 & 好词好句 打卡
  $$('.poem-recite-btn').forEach(function(b){
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',function(){
      var i=parseInt(b.dataset.poem);
      if(!isNaN(i)){
        var d=loadTask();d['poem_'+i]=!d['poem_'+i];saveTask(d);
        if(d['poem_'+i]){b.textContent='已背✓';b.classList.add('done');}
        else{b.textContent='📖 我会背了！';b.classList.remove('done');}
      }
      // 好词好句打卡
      var gw=parseInt(b.dataset.gword);
      if(!isNaN(gw)){
        var d=loadTask();d['gword_'+gw]=!d['gword_'+gw];saveTask(d);
        if(d['gword_'+gw]){b.textContent='✅ 已积累';b.classList.add('done');}
        else{b.textContent='📝 积累好词好句';b.classList.remove('done');}
      }
      updateProgress();updateMelody();updateSidebarCounts();
    });
  });
  // 数学每日打卡按钮
  $$('.daily-check-btn').forEach(function(b){
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',function(){
      var id=b.dataset.daily;if(!id)return;
      var d=loadTask();d[id]=!d[id];saveTask(d);
      if(d[id]){b.textContent='✅ 今日已学';b.classList.add('done');}
      else{b.textContent='📝 今日已学，打卡';b.classList.remove('done');}
      updateProgress();updateMelody();updateSidebarCounts();
    });
  });
  // 表达
  var eb=$('#expressBtn');
  if(eb&&!eb.dataset.bound){eb.dataset.bound='1';eb.addEventListener('click',function(){
    var dayIdx=dayIndex(EXPRESS.length);
    var dt=loadTask();dt['express_text_'+dayIdx]=$('#expressInput').value;dt['express_'+dayIdx]=true;saveTask(dt);
    eb.textContent='已完成✅';eb.style.background='var(--green)';
    updateProgress();updateMelody();
  });}
  // 听力
  var lp=$('#listenPlayBtn');
  if(lp&&!lp.dataset.bound){lp.dataset.bound='1';lp.addEventListener('click',function(){speakEn($('#listenText').textContent);});}
  var st=$('#showTextBtn');
  if(st&&!st.dataset.bound){st.dataset.bound='1';st.addEventListener('click',function(){
    var t=$('#listenText');if(t.style.display==='none'||!t.style.display){t.style.display='block';st.textContent='👁 隐藏原文';}
    else{t.style.display='none';st.textContent='👁 查看原文';}
  });}
  // 听力选项
  $$('.quiz-option[data-lq]').forEach(function(o){
    if(o.dataset.bound)return;o.dataset.bound='1';
    o.addEventListener('click',function(){
      var i=parseInt(o.dataset.lq),j=parseInt(o.dataset.lopt);
      var dayIdx=dayIndex(LISTENINGS.length);
      var L=LISTENINGS[dayIdx];
      var all=$$('.quiz-option[data-lq="'+i+'"]');
      all.forEach(function(x){x.classList.remove('selected','correct','wrong')});
      o.classList.add('selected');
      if(j===L.questions[i].answer)o.classList.add('correct');
      else{o.classList.add('wrong');all[L.questions[i].answer].classList.add('correct');}
      $('#lexplain_'+i).classList.add('show');
    });
  });
  // 单词
  $$('.word-speak').forEach(function(b){
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',function(){speakEn(b.dataset.en);});
  });
  $$('.word-star').forEach(function(s){
    if(s.dataset.bound)return;s.dataset.bound='1';
    s.addEventListener('click',function(){
      var d=loadTask();d[s.dataset.wkey]=!d[s.dataset.wkey];saveTask(d);
      s.classList.toggle('on');
      updateProgress();updateMelody();
    });
  });
  // 练习题
  $$('.quiz-option[data-quiz]').forEach(function(o){
    if(o.dataset.bound)return;o.dataset.bound='1';
    o.addEventListener('click',function(){
      var p=o.dataset.quiz.split('_'),lvl=p[0],idx=parseInt(p[1]);
      var qa=lvl==='basic'?QUIZ_BASIC:lvl==='improve'?QUIZ_IMPROVE:QUIZ_CHALLENGE;
      var q=qa[idx];
      var all=$$('#quiz_'+lvl+'_'+idx+' .quiz-option');
      all.forEach(function(x){x.classList.remove('selected','correct','wrong')});
      o.classList.add('selected');
      if(parseInt(o.dataset.opt)===q.answer){o.classList.add('correct');$('#explain_'+lvl+'_'+idx).classList.add('show');}
      else{o.classList.add('wrong');all[q.answer].classList.add('correct');$('#explain_'+lvl+'_'+idx).classList.add('show');}
    });
  });
  // 计时器按钮
  bindTimerBtn('chReadBtn','chReadTime','ch_read_secs',3600,'ch_read','阅读1小时完成！✅');
  // 好词好句打卡
  $$('[data-gword]').forEach(function(b){
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',function(){
      var i=parseInt(b.dataset.gword);
      var d=loadTask();d['gword_'+i]=!d['gword_'+i];saveTask(d);
      if(d['gword_'+i]){b.textContent='✅ 已积累';b.classList.add('done');}
      else{b.textContent='📝 积累好词好句';b.classList.remove('done');}
      updateProgress();updateMelody();
    });
  });
  // 运动按钮
  $$('.sport-btn').forEach(function(b){
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',function(){
      var sid=b.dataset.sport,act=b.dataset.act;
      if(act==='toggle'){
        if(sportTimers[sid]){
          clearInterval(sportTimers[sid]);sportTimers[sid]=null;
          b.textContent='▶';b.classList.remove('stop');b.classList.add('start');
        }else{
          sportTimers[sid]=setInterval(function(){
            var dt=loadTask();dt['sport_'+sid]=(dt['sport_'+sid]||0)+1;
            if((dt['sport_'+sid]||0)>=60)dt['sport_done']=true;
            saveTask(dt);
            var s=dt['sport_'+sid],m=Math.floor(s/60),ss=s%60;
            $('#stime_'+sid).textContent=m+':'+String(ss).padStart(2,'0');
            updateSportTotal();
          },1000);
          b.textContent='⏸';b.classList.remove('start');b.classList.add('stop');
        }
      }
    });
  });
}

var listenTimers={};
function bindTimerBtn(btnId,timeId,storageKey,targetSecs,taskId,msg){
  var btn=$('#'+btnId);if(!btn||btn.dataset.bound)return;btn.dataset.bound='1';
  var secs=loadTask()[storageKey]||0;
  listenTimers[btnId]=null;
  btn.addEventListener('click',function(){
    if(listenTimers[btnId]){
      clearInterval(listenTimers[btnId]);listenTimers[btnId]=null;btn.textContent='⏱';
    }else{
      listenTimers[btnId]=setInterval(function(){
        var d=loadTask();d[storageKey]=(d[storageKey]||0)+1;saveTask(d);
        var s=d[storageKey],m=Math.floor(s/60),ss=s%60;
        $('#'+timeId).textContent=m+':'+String(ss).padStart(2,'0');
        if(s>=targetSecs&&!d[taskId]){
          d[taskId]=true;saveTask(d);
          updateProgress();updateMelody();
          alert(msg);clearInterval(listenTimers[btnId]);listenTimers[btnId]=null;btn.textContent='⏱';
        }
      },1000);
      btn.textContent='⏸';
    }
  });
  var s=secs,m=Math.floor(s/60),ss=s%60;
  $('#'+timeId).textContent=m+':'+String(ss).padStart(2,'0');
}

function updateSportTotal(){
  var d=loadTask(),total=0;
  SPORTS.forEach(function(s){total+=d['sport_'+s.id]||0;});
  var el=$('#sportTotal');if(el)el.textContent=Math.floor(total/60)+'分'+(total%60)+'秒';
}

function speakEn(text){
  if(!('speechSynthesis' in window)){alert('浏览器不支持语音');return;}
  window.speechSynthesis.cancel();
  var u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=0.8;
  window.speechSynthesis.speak(u);
}

// ============ 进度 + 美乐蒂 ============
function getStudyTasks(){
  var tasks=[];
  // 语文：作业2 + 阅读1 + 好词好句1 + 古诗1 + 表达1
  tasks.push('ch_hw'); tasks.push('ch_review'); tasks.push('ch_read');
  tasks.push('gword_'+dayIndex(GOOD_WORDS.length));
  tasks.push('poem_'+dayIndex(POEMS.length));
  tasks.push('express_'+dayIndex(EXPRESS.length));
  // 数学：5个模块打卡
  tasks.push('math_map'); tasks.push('math_concept');
  tasks.push('math_quiz'); tasks.push('math_life'); tasks.push('math_pit');
  // 英语：学而思1 + 单词1
  tasks.push('eng_xueersi');
  var allWords=[];
  WORDS.forEach(function(u){u.list.forEach(function(w,i){allWords.push({en:w.en,cn:w.cn,unit:u.unit,idx:i});});});
  tasks.push('word_'+allWords[dayIndex(allWords.length)].unit+'_'+allWords[dayIndex(allWords.length)].idx);
  // 生活：4个习惯
  tasks.push('brush_morning'); tasks.push('brush_evening');
  tasks.push('meal_speed'); tasks.push('sleep_early');
  // 运动：今日运动（任意运动>0即算完成）
  tasks.push('sport_done');
  return tasks;
}

function updateProgress(){
  var pct=getStudyProgressPct();
  $('#progressPct').textContent=pct+'%';
  var fill=$('#progressFill');
  fill.style.width=pct+'%';
  fill.classList.toggle('qualified',pct>=70);
  fill.classList.toggle('complete',pct>=100);
  // 100%完成时进度条金色
  var bar=fill.parentElement;
  if(bar){
    bar.classList.toggle('bar-complete',pct>=100);
  }
}

function updateSidebarCounts(){
  var d=loadTask();
  // 语文：作业2 + 阅读1 + 好词好句1 + 古诗1 + 表达1 = 6
  var chTotal=6;
  var chDone=(d.ch_hw?1:0)+(d.ch_review?1:0)+(d.ch_read?1:0);
  if(d['gword_'+dayIndex(GOOD_WORDS.length)])chDone++;
  if(d['poem_'+dayIndex(POEMS.length)])chDone++;
  if(d['express_'+dayIndex(EXPRESS.length)])chDone++;
  $('#cntChinese').textContent=chDone+'/'+chTotal;
  // 数学：5个模块打卡
  var mathTotal=5;
  var mathDone=(d.math_map?1:0)+(d.math_concept?1:0)+(d.math_quiz?1:0)+(d.math_life?1:0)+(d.math_pit?1:0);
  $('#cntMath').textContent=mathDone+'/'+mathTotal;
  // 英语：学而思1 + 每日单词1 = 2
  var engTotal=2;
  var engDone=(d.eng_xueersi?1:0);
  var allWords=[];
  WORDS.forEach(function(u){u.list.forEach(function(w,i){allWords.push({en:w.en,cn:w.cn,unit:u.unit,idx:i});});});
  var wordKey='word_'+allWords[dayIndex(allWords.length)].unit+'_'+allWords[dayIndex(allWords.length)].idx;
  if(d[wordKey])engDone++;
  $('#cntEnglish').textContent=engDone+'/'+engTotal;
  // 生活：4个习惯
  var lfTotal=4,lvDone=(d.brush_morning?1:0)+(d.brush_evening?1:0)+(d.meal_speed?1:0)+(d.sleep_early?1:0);
  $('#cntLife').textContent=lvDone+'/'+lfTotal;
  // 运动：任意运动>0即算完成
  var spTotal=1,spDone=0;
  var sportTotal=0;
  SPORTS.forEach(function(s){sportTotal+=d['sport_'+s.id]||0;});
  if(sportTotal>0)spDone=1;
  $('#cntSport').textContent=spDone+'/'+spTotal;
  // 游戏
  var pg=getGameProgress();var gDone=0;
  ['math','chinese','english'].forEach(function(s){if(pg[s]&&pg[s].completed)gDone+=pg[s].completed.filter(function(x){return x}).length;});
  var gTotal=15;
  if($('#cntGame'))$('#cntGame').textContent=gDone+'/'+gTotal;
}

function updateMelody(){
  var d=loadTask();
  var studyTasks=getStudyTasks();
  var done=0;studyTasks.forEach(function(t){if(d[t])done++;});
  var pct=Math.round(done/studyTasks.length*100);
  var total=studyTasks.length;
  var avatar=$('#melodySvg').parentElement;
  var status=$('#mascotStatus');
  var actions=$('#melodyActions');
  var mouth=$('#mouth');
  var hood=$('#hood');
  var earL=$('#earL');
  var earR=$('#earR');
  var bow=$('#bow');
  // 多级状态
  avatar.classList.remove('sad','happy','super');
  if(pct>=100){
    // 🌟 全部完成！
    avatar.classList.add('super');
    status.textContent='太厉害了！全部完成！美乐蒂超开心！🎉🌟';
    actions.style.display='flex';
    if(mouth)mouth.setAttribute('d','M42 54 Q50 72 58 54');
    if(hood)hood.setAttribute('fill','#FFD700');
    if(earL)earL.setAttribute('fill','#FFD700');
    if(earR)earR.setAttribute('fill','#FFD700');
    if(bow)bow.setAttribute('opacity','1');
    // 今日首次100%弹窗
    if(!d._celebrated_100){
      d._celebrated_100=true;saveTask(d);
      setTimeout(function(){showPraise('🌟','恭喜珊珊！今天所有任务全部完成！\\n美乐蒂开心得发光了✨\\n明天继续加油哦～');},600);
    }
    updateStreak(true);
  }else if(pct>=70){
    avatar.classList.add('happy');
    status.textContent='谢谢珊珊！今天你真棒！💖 ('+done+'/'+total+')';
    actions.style.display='flex';
    if(mouth)mouth.setAttribute('d','M42 56 Q50 66 58 56');
    if(hood){hood.setAttribute('fill','url(#hoodGrad)');}
    if(earL)earL.setAttribute('fill','url(#hoodGrad)');
    if(earR)earR.setAttribute('fill','url(#hoodGrad)');
    updateStreak(true);
  }else if(pct>=40){
    avatar.classList.remove('sad');
    status.textContent='加油珊珊！快过半啦～💪 ('+done+'/'+total+')';
    actions.style.display='none';
    if(mouth)mouth.setAttribute('d','M44 58 Q50 64 56 58');
    updateStreak(false);
  }else{
    avatar.classList.add('sad');
    status.textContent='珊珊，今天还没开始呢，快行动起来吧！🌱 ('+done+'/'+total+')';
    actions.style.display='none';
    if(mouth)mouth.setAttribute('d','M44 60 Q50 52 56 60');
    updateStreak(false);
  }
}

function updateStreak(qualified){
  var streak=parseInt(localStorage.getItem('streak')||'0');
  $('#streakNum').textContent=streak;
  if(qualified){
    var counted=localStorage.getItem('streak_counted_'+today());
    if(counted!=='1'){
      streak++;localStorage.setItem('streak',String(streak));
      localStorage.setItem('streak_counted_'+today(),'1');
      $('#streakNum').textContent=streak;
      if(streak>0&&streak%7===0){
        setTimeout(function(){showPraise('🎉','恭喜！连续'+streak+'天达标！');},500);
      }
    }
  }
}

// ============ 互动 ============
function openFeed(){
  $('#foodGrid').innerHTML=FOODS.map(function(f,i){
    return '<div class="food-item" onclick="feedMelody('+i+')">'+f.icon+'</div>';
  }).join('');
  $('#feedModal').classList.add('show');
}
function feedMelody(i){
  var f=FOODS[i];closeAllModals();
  var mouth=$('#mouth');if(mouth)mouth.setAttribute('d','M42 54 Q50 68 58 54');
  setTimeout(function(){if(mouth)mouth.setAttribute('d','M42 56 Q50 66 58 56');},2000);
  showPraise(f.icon,'美乐蒂吃掉了'+f.name+'！好开心！');
}

var bathStep=0;
function openBath(){bathStep=0;renderBathSteps();$('#bathModal').classList.add('show');}
function renderBathSteps(){
  $('#bathSteps').innerHTML=BATH_STEPS.map(function(s,i){
    var cls=i<bathStep?'done':i===bathStep?'current':'';
    return '<div class="bath-step '+cls+'" onclick="doBathStep('+i+')"><span class="bath-step-icon">'+s.icon+'</span><span class="bath-step-text">'+s.name+'</span><span class="bath-step-check">✓</span></div>';
  }).join('');
}
function doBathStep(i){
  if(i!==bathStep)return;bathStep++;renderBathSteps();
  if(bathStep>=BATH_STEPS.length){
    setTimeout(function(){closeAllModals();showPraise('🛁','美乐蒂洗得干干净净！\n谢谢珊珊！');},500);
  }
}

function showPraise(e,t){$('#praiseEmoji').textContent=e;$('#praiseText').textContent=t;$('#praiseModal').classList.add('show');}
function closeModal(id){$('#'+id).classList.remove('show');}
function closeAllModals(){$$('.modal').forEach(function(m){m.classList.remove('show')});}

// ============ 关卡切换 ============
// ============ 初始化 ============
function init(){
  setupSidebar();
  renderSubcat();
  renderContent();
  updateProgress();
  updateMelody();
}

document.addEventListener('DOMContentLoaded',init);
