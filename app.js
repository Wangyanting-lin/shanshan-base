// ============ 工具 ============
var $=function(s){return document.querySelector(s)};
var $$=function(s){return document.querySelectorAll(s)};
var today=function(){return new Date().toISOString().slice(0,10)};
var loadTask=function(){try{return JSON.parse(localStorage.getItem('task_'+today())||'{}')}catch(e){return{}}};
var saveTask=function(d){localStorage.setItem('task_'+today(),JSON.stringify(d))};

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
  {cat:'统计',name:'条形统计图',formula:'横轴+纵轴+直条',explain:'直条越高数据越大'},
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
  {pit:'0不能做除数',wrong:'5÷0=0',right:'0不能做除数',tip:'0可做被除数，但不能做除数'},
];

var LIFE_MATH=[
  {concept:'大数认识',life:'超市一天营业额328540元，读作"三十二万八千五百四十"。写成"32万"是近似数，写32.8540万是精确数。',q:'你家到学校约多少米？用大数试试写出来'},
  {concept:'乘法',life:'一箱苹果24个，买15箱共多少个？24×15=360个。超市用乘法快速算库存。',q:'一瓶水3元，买48瓶需要多少钱？用简便方法算'},
  {concept:'除法',life:'班上40人去秋游，每辆车坐15人，需要几辆？40÷15=2辆...10人→3辆。"进一法"。',q:'你有100元，每支笔8元，最多买几支？'},
  {concept:'线与角',life:'时钟3:00时针分针成90°直角；6:00成180°平角。剪刀张开是锐角，打开扇子是钝角。',q:'你能在家里找到几个直角？'},
  {concept:'运算律',life:'超市买25包纸巾每包4元+25瓶水每瓶4元=25×4+25×4=200。用乘法分配律25×(4+4)=25×8=200。',q:'用运算律算 4×25+6×25=?'},
  {concept:'统计',life:'气象站统计一周降雨量画条形图，直条越高雨量越大。你家一周用水量也可以画统计图！',q:'记录你家一周用水量，画个条形图'},
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
  {unit:'Unit 6',list:[{en:'father',cn:'父亲'},{en:'mother',cn:'母亲'},{en:'uncle',cn:'叔叔'},{en:'aunt',cn:'阿姨'},{en:'cousin',cn:'表兄妹'}]},
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
  {title:'背单词技巧3',rule:'联想记忆法：画面联想',example:'eye=两只眼睛(e)中间一个鼻子(y)'},
];

var EXPRESS=[
  {type:'每日一读',content:'小松鼠秋天忙着收集松果。它每天跑来跑去，把松果藏在地洞里。冬天来了，大雪盖住了地面。小松鼠在温暖的窝里，吃着松果，开心地笑了。\n\n问1：小松鼠秋天在做什么？\n问2：它为什么冬天不愁吃的？\n问3：这个故事告诉我们什么道理？',hint:'用"先…然后…最后…"复述故事'},
  {type:'看图说话',content:'想象你看到一幅画：一个小女孩在公园里放风筝，旁边有她的妈妈在微笑。\n\n请描述这幅画：谁在哪里做什么？心情怎样？用至少3句话。',hint:'用"有…""正在…""开心地…"等词'},
  {type:'复述训练',content:'读一遍这段话，然后不看屏幕，复述出来：\n\n春天来了，燕子从南方飞回来了。柳树发出了嫩芽，小草从土里钻出来。孩子们脱下棉袄，跑到草地上放风筝。',hint:'记住关键词：燕子、柳树、小草、孩子、风筝'},
  {type:'词语接龙',content:'用"开心"开头，每个词的最后一个字是下一个词的第一个字。\n\n开心→心情→(  )→(  )→(  )\n\n写出至少4个词！',hint:'心情→情况→况且→且说…'},
  {type:'扩句游戏',content:'把短句变长句！\n\n基础句："小鸟飞。"\n\n加"在哪里"→"小鸟在天上飞。"\n再加"什么时候"→"(  )小鸟在天上(  )飞。"\n继续加"怎样飞"→完整句：',hint:'越详细越好！'},
  {type:'表达挑战',content:'今天发生了什么有趣的事？用5句话写下来。要求：有时间、地点、人物、经过、感受。',hint:'可以写学校的事、家里的事、和朋友的事'},
];

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


// ============ 好词好句渲染 ============
function renderGoodWords(d){
  var currentLevel=d.ch_words_level||0;
  if(currentLevel>=GOOD_WORDS.length)currentLevel=0;
  var g=GOOD_WORDS[currentLevel];
  var key='gword_'+currentLevel;
  var done=d[key];
  var h='';
  h+='<div class="card" style="text-align:center;padding:18px 14px">';
  h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">';
  h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(\'ch_words_level\',-1,'+GOOD_WORDS.length+')">⬅ 上一篇</button>';
  h+='<div style="background:linear-gradient(135deg,#FFB6C1,#FF85A2);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">🌸 第'+(currentLevel+1)+'篇</div>';
  h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(\'ch_words_level\',1,'+GOOD_WORDS.length+')">下一篇 ➡</button>';
  h+='</div>';
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
  h+='<button class="poem-recite-btn'+(done?' done':'')+'" data-gword="'+currentLevel+'" style="font-size:16px;padding:10px 30px;border-radius:20px">'+(done?'✅ 已积累':'📝 积累好词好句')+'</button>';
  h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+GOOD_WORDS.length+'篇 · 每天积累1篇</div>';
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
    // 闯关模式：每天一关，显示当前关
    var currentLevel=d.ch_poem_level||0;
    if(currentLevel>=POEMS.length)currentLevel=0;
    var p=POEMS[currentLevel];
    var key='poem_'+currentLevel;
    var done=d[key];
    h+='<div class="card" style="text-align:center;padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;ch_poem_level&apos;,-1,&apos;+POEMS.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#FFD700,#FFA500);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;ch_poem_level&apos;,1,&apos;+POEMS.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<div style="font-size:26px;font-weight:800;color:var(--pink);margin-bottom:4px;font-family:STKaiti,KaiTi,serif">'+p.title+'</div>';
    h+='<div style="font-size:15px;color:var(--gray-500);margin-bottom:20px">'+p.author+'</div>';
    h+='<div style="font-size:22px;line-height:2.2;color:#333;font-family:STKaiti,KaiTi,serif;margin-bottom:20px">'+p.content.replace(/\n/g,'<br>')+'</div>';
    h+='<div style="background:var(--pink-light);border-radius:14px;padding:14px;margin-bottom:16px">';
    h+='<div style="font-size:13px;color:var(--gray-600);line-height:1.8">📝 诗意：<br>明亮的月光照在床前，白白的就像地上结了霜。抬起头看天上的明月，低下头想起远方的家。</div>';
    h+='</div>';
    h+='<button class="poem-recite-btn'+(done?' done':'')+'" data-poem="'+currentLevel+'" style="font-size:16px;padding:10px 30px;border-radius:20px">'+(done?'✅ 已背会':'📖 我会背了！')+'</button>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+POEMS.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='read'){
    h+='<div class="card"><div class="card-title">📖 课外阅读 1小时</div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_read?' done':'')+'" data-id="ch_read">✓</div><div class="task-text'+(d.ch_read?' done':'')+'">课外阅读 1小时</div><span class="task-time" id="chReadTime">0:00</span><button class="btn btn-primary btn-sm" id="chReadBtn" style="margin-left:6px">⏱</button></div>';
    h+='<p style="font-size:14px;color:var(--gray-600);line-height:1.8;margin-top:10px;background:var(--pink-light);padding:12px;border-radius:10px">💡 阅读小贴士：<br>• 选择孩子感兴趣的课外书<br>• 读完后家长和孩子讨论内容<br>• 鼓励孩子说出自己的感想<br>• 可以做简单的读书笔记</p>';
    h+='</div>';
  }else if(currentSub==='express'){
    h+='<div class="card"><div class="card-title">💡 理解表达力训练（每日轮换）</div>';
    h+='<p style="font-size:14px;color:var(--gray-500);margin-bottom:8px">每天一道不同的题型，坚持训练让理解表达能力越来越棒！</p>';
    var dayIdx=new Date().getDate()%EXPRESS.length;
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
    // 思维导图闯关
    var currentLevel=d.math_map_level||0;
    if(currentLevel>=MINDMAP.length)currentLevel=0;
    var n=MINDMAP[currentLevel];
    var diffStars='';
    for(var j=0;j<n.diff;j++)diffStars+='★';
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_map_level&apos;,-1,&apos;+MINDMAP.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#A6CCFF,#5B9BD5);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_map_level&apos;,1,&apos;+MINDMAP.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<div style="font-size:22px;font-weight:800;color:var(--blue);margin-bottom:8px">'+n.name+'</div>';
    h+='<div style="font-size:16px;color:var(--gray-600);margin-bottom:10px">难度：<span style="color:var(--orange)">'+diffStars+'</span></div>';
    if(n.relation)h+='<div style="font-size:14px;color:var(--gray-500);background:var(--blue-light);padding:10px;border-radius:10px;margin-bottom:16px">→ '+n.relation+'</div>';
    h+='<p style="font-size:15px;color:var(--gray-600);line-height:2">💡 学习建议：<br>• 先理解这个知识点的含义<br>• 看课本例题<br>• 做3道练习题巩固</p>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+MINDMAP.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='concept'){
    // 概念速查闯关
    var currentLevel=d.math_concept_level||0;
    if(currentLevel>=CONCEPTS.length)currentLevel=0;
    var c=CONCEPTS[currentLevel];
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_concept_level&apos;,-1,&apos;+CONCEPTS.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#A6CCFF,#5B9BD5);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_concept_level&apos;,1,&apos;+CONCEPTS.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<div style="font-size:14px;color:var(--gray-500);margin-bottom:8px">'+c.cat+'</div>';
    h+='<div style="font-size:24px;font-weight:800;color:var(--blue);margin-bottom:12px">'+c.name+'</div>';
    h+='<div style="background:var(--blue-light);border-radius:14px;padding:16px;margin-bottom:16px">';
    h+='<div style="font-size:18px;font-weight:700;color:var(--blue-dark);margin-bottom:8px">'+c.formula+'</div>';
    h+='<div style="font-size:16px;color:#555;line-height:1.8">'+c.explain+'</div>';
    h+='</div>';
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+CONCEPTS.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='quiz'){
    // 练习题闯关
    var currentLevel=d.math_quiz_level||0;
    var allQuiz=QUIZ_BASIC.concat(QUIZ_IMPROVE).concat(QUIZ_CHALLENGE);
    if(currentLevel>=allQuiz.length)currentLevel=0;
    var q=allQuiz[currentLevel];
    var levelName=currentLevel<QUIZ_BASIC.length?'基础':currentLevel<QUIZ_BASIC.length+QUIZ_IMPROVE.length?'提高':'挑战';
    var levelColor=currentLevel<QUIZ_BASIC.length?'var(--green)':currentLevel<QUIZ_BASIC.length+QUIZ_IMPROVE.length?'var(--orange)':'var(--purple)';
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_quiz_level&apos;,-1,&apos;+allQuiz.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#A6CCFF,#5B9BD5);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_quiz_level&apos;,1,&apos;+allQuiz.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<span style="display:inline-block;padding:4px 14px;border-radius:12px;font-size:12px;font-weight:700;color:#fff;background:'+levelColor+'">'+levelName+'题</span>';
    h+='<div style="font-size:20px;font-weight:700;margin:16px 0;line-height:1.6">'+q.q+'</div>';
    h+='<div class="quiz-options">';
    q.options.forEach(function(opt,j){
      h+='<div class="quiz-option" data-quiz="all_'+currentLevel+'" data-opt="'+j+'" style="font-size:16px;padding:12px">'+opt+'</div>';
    });
    h+='</div>';
    h+='<div class="quiz-explain" id="explain_all_'+currentLevel+'" style="font-size:14px;padding:12px">💡 '+q.explain+'</div>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+allQuiz.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='life'){
    // 生活化解读闯关
    var currentLevel=d.math_life_level||0;
    if(currentLevel>=LIFE_MATH.length)currentLevel=0;
    var l=LIFE_MATH[currentLevel];
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_life_level&apos;,-1,&apos;+LIFE_MATH.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#A6CCFF,#5B9BD5);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_life_level&apos;,1,&apos;+LIFE_MATH.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<div style="font-size:20px;font-weight:800;color:var(--blue);margin-bottom:12px">'+l.concept+'</div>';
    h+='<div style="font-size:18px;color:#444;line-height:2;margin-bottom:16px;background:var(--blue-light);padding:16px;border-radius:14px">'+l.life+'</div>';
    h+='<div style="font-size:16px;color:var(--orange);padding:12px;background:var(--orange-light);border-radius:12px">💡 '+l.q+'</div>';
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+LIFE_MATH.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='pit'){
    // 易错点闯关
    var currentLevel=d.math_pit_level||0;
    if(currentLevel>=PITFALLS.length)currentLevel=0;
    var p=PITFALLS[currentLevel];
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_pit_level&apos;,-1,&apos;+PITFALLS.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#A6CCFF,#5B9BD5);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;math_pit_level&apos;,1,&apos;+PITFALLS.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
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
    h+='<div style="font-size:11px;color:var(--gray-500);margin-top:10px">共'+PITFALLS.length+'关 · 每天过1关</div>';
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
    // 听力闯关
    var currentLevel=d.eng_listen_level||0;
    if(currentLevel>=LISTENINGS.length)currentLevel=0;
    var L=LISTENINGS[currentLevel];
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;eng_listen_level&apos;,-1,&apos;+LISTENINGS.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#FFD93D,#FFA552);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;eng_listen_level&apos;,1,&apos;+LISTENINGS.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
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
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+LISTENINGS.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='xueersi'){
    h+='<div class="card"><div class="card-title">📝 学而思练习册</div>';
    h+='<div class="task-item"><div class="task-check'+(d.eng_xueersi?' done':'')+'" data-id="eng_xueersi">✓</div><div class="task-text'+(d.eng_xueersi?' done':'')+'">完成学而思练习册一页</div></div>';
    h+='<p style="font-size:14px;color:var(--gray-600);margin-top:10px;line-height:1.8;background:var(--orange-light);padding:12px;border-radius:10px">💡 做题小贴士：<br>• 不认识的单词先做标记<br>• 做完一题检查一题<br>• 错题要看解析并整理笔记</p>';
    h+='</div>';
  }else if(currentSub==='words'){
    // 单词闯关
    var allWords=[];
    WORDS.forEach(function(u){u.list.forEach(function(w,i){allWords.push({en:w.en,cn:w.cn,unit:u.unit,idx:i});});});
    var currentLevel=d.eng_word_level||0;
    if(currentLevel>=allWords.length)currentLevel=0;
    var w=allWords[currentLevel];
    var key='word_'+w.unit+'_'+w.idx;
    var starred=d[key];
    h+='<div class="card" style="text-align:center;padding:30px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;eng_word_level&apos;,-1,&apos;+allWords.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#FFD93D,#FFA552);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;eng_word_level&apos;,1,&apos;+allWords.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<div style="font-size:42px;font-weight:800;color:var(--orange);margin-bottom:8px">'+w.en+'</div>';
    h+='<div style="font-size:24px;color:var(--gray-600);margin-bottom:20px">'+w.cn+'</div>';
    h+='<div style="display:flex;justify-content:center;gap:16px;margin-bottom:20px">';
    h+='<button class="word-speak" data-en="'+w.en+'" style="width:50px;height:50px;font-size:20px;border-radius:50%">🔊</button>';
    h+='<span class="word-star'+(starred?' on':'')+'" data-wkey="'+key+'" style="font-size:36px;cursor:pointer">⭐</span>';
    h+='</div>';
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+allWords.length+'关 · 每天过1关</div>';
    h+='</div>';
  }else if(currentSub==='grammar'){
    // 语法闯关
    var currentLevel=d.eng_grammar_level||0;
    if(currentLevel>=GRAMMARS.length)currentLevel=0;
    var g=GRAMMARS[currentLevel];
    h+='<div class="card" style="padding:20px 14px">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;eng_grammar_level&apos;,-1,&apos;+GRAMMARS.length+&apos;)">⬅ 上一关</button>';
    h+='<div style="background:linear-gradient(135deg,#FFD93D,#FFA552);color:#fff;padding:6px 16px;border-radius:16px;font-size:14px;font-weight:800">⭐ 第'+(currentLevel+1)+'关</div>';
    h+='<button class="btn btn-sm" style="background:var(--gray-100);color:var(--gray-600)" onclick="changeLevel(&apos;eng_grammar_level&apos;,1,&apos;+GRAMMARS.length+&apos;)">下一关 ➡</button>';
    h+='</div>';
    h+='<div style="font-size:22px;font-weight:800;color:var(--orange);margin-bottom:16px">'+g.title+'</div>';
    h+='<div style="background:var(--orange-light);border-radius:14px;padding:16px;margin-bottom:16px">';
    h+='<div style="font-size:18px;color:#555;line-height:1.8;margin-bottom:10px">'+g.rule+'</div>';
    h+='<div style="font-size:16px;color:#8B5A1B;background:#fff;padding:10px;border-radius:10px">例：'+g.example+'</div>';
    h+='</div>';
    h+='<div style="font-size:11px;color:var(--gray-500)">共'+GRAMMARS.length+'关 · 每天过1关</div>';
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
  // 古诗
  $$('.poem-recite-btn').forEach(function(b){
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',function(){
      var i=parseInt(b.dataset.poem);
      var d=loadTask();d['poem_'+i]=!d['poem_'+i];saveTask(d);
      if(d['poem_'+i]){b.textContent='已背✓';b.classList.add('done');b.parentElement.querySelector('.poem-title').innerHTML=POEMS[i].title+' ✅';}
      else{b.textContent='背诵打卡';b.classList.remove('done');b.parentElement.querySelector('.poem-title').innerHTML=POEMS[i].title;}
      updateProgress();updateMelody();
    });
  });
  // 表达
  var eb=$('#expressBtn');
  if(eb&&!eb.dataset.bound){eb.dataset.bound='1';eb.addEventListener('click',function(){
    var dayIdx=new Date().getDate()%EXPRESS.length;
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
      var dayIdx=new Date().getDate()%LISTENINGS.length;
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
            var dt=loadTask();dt['sport_'+sid]=(dt['sport_'+sid]||0)+1;saveTask(dt);
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
  var tasks=['ch_hw','ch_review','ch_words','ch_read'];
  POEMS.forEach(function(p,i){tasks.push('poem_'+i)});
  tasks.push('express_'+(new Date().getDate()%EXPRESS.length));
  tasks.push('eng_xueersi');
  WORDS.forEach(function(u){u.list.forEach(function(w,i){tasks.push('word_'+u.unit+'_'+i)})});
  return tasks;
}

function updateProgress(){
  var pct=getStudyProgressPct();
  $('#progressPct').textContent=pct+'%';
  var fill=$('#progressFill');
  fill.style.width=pct+'%';
  fill.classList.toggle('qualified',pct>=70);
}

function updateSidebarCounts(){
  var d=loadTask();
  // 语文
  var chTotal=2+POEMS.length+1+1+1;//hw+review+poems+goodwords+read+express
  var chDone=(d.ch_hw?1:0)+(d.ch_review?1:0)+(d.ch_words?1:0)+(d.ch_read?1:0);
  POEMS.forEach(function(p,i){if(d['poem_'+i])chDone++;});
  if(d['express_'+(new Date().getDate()%EXPRESS.length)])chDone++;
  $('#cntChinese').textContent=chDone+'/'+chTotal;
  // 数学：思维导图是知识点不是任务，分层练习是任务
  $('#cntMath').textContent='5模块';
  // 英语
  var engTotal=1+WORDS.reduce(function(s,u){return s+u.list.length;},0);
  var engDone=(d.eng_xueersi?1:0);
  WORDS.forEach(function(u){u.list.forEach(function(w,i){if(d['word_'+u.unit+'_'+i])engDone++;});});
  $('#cntEnglish').textContent=engDone+'/'+engTotal;
  // 生活
  var lfTotal=4,lvDone=(d.brush_morning?1:0)+(d.brush_evening?1:0)+(d.meal_speed?1:0)+(d.sleep_early?1:0);
  $('#cntLife').textContent=lvDone+'/'+lfTotal;
  // 运动
  var spTotal=SPORTS.length,spDone=0;
  SPORTS.forEach(function(s){if((d['sport_'+s.id]||0)>0)spDone++;});
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
  var pct=done/studyTasks.length*100;
  var qualified=pct>=70;
  var avatar=$('#melodySvg').parentElement;
  var status=$('#mascotStatus');
  var actions=$('#melodyActions');
  if(qualified){
    avatar.classList.remove('sad');
    status.textContent='谢谢珊珊！今天你真棒！💖';
    actions.style.display='flex';
    var mouth=$('#mouth');if(mouth)mouth.setAttribute('d','M42 56 Q50 66 58 56');
    updateStreak(true);
  }else{
    avatar.classList.add('sad');
    status.textContent='珊珊，明天要加油噢！💪';
    actions.style.display='none';
    var mouth=$('#mouth');if(mouth)mouth.setAttribute('d','M44 60 Q50 52 56 60');
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
function changeLevel(key,delta,max){
  var d=loadTask();
  var current=d[key]||0;
  current+=delta;
  if(current<0)current=0;
  if(current>=max)current=max-1;
  d[key]=current;
  saveTask(d);
  renderContent();
}

// ============ 初始化 ============
function init(){
  setupSidebar();
  renderSubcat();
  renderContent();
  updateProgress();
  updateMelody();
}

document.addEventListener('DOMContentLoaded',init);
