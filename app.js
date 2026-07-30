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

// ============ 侧栏配置 ============
var CATEGORIES={
  chinese:{
    name:'语文',color:'pink',
    subs:[
      {id:'homework',name:'📝 学校作业'},
      {id:'listen',name:'🔊 课文熏听'},
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
  $('#contentArea').innerHTML=h;
  bindAllEvents();
  updateSidebarCounts();
}

// ============ 语文内容 ============
function renderChinese(){
  var d=loadTask();
  var h='';
  if(currentSub==='homework'){
    h+='<div class="card"><div class="card-title">📝 学校作业</div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_hw?' done':'')+'" data-id="ch_hw">✓</div><div class="task-text'+(d.ch_hw?' done':'')+'">完成今天老师留的所有作业</div></div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_review?' done':'')+'" data-id="ch_review">✓</div><div class="task-text'+(d.ch_review?' done':'')+'">检查作业 + 装书包</div></div>';
    h+='</div>';
  }else if(currentSub==='listen'){
    h+='<div class="card"><div class="card-title">🔊 课文熏听 10分钟</div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_listen?' done':'')+'" data-id="ch_listen">✓</div><div class="task-text'+(d.ch_listen?' done':'')+'">课文熏听 10分钟</div><span class="task-time" id="chListenTime">0:00</span><button class="btn btn-primary btn-sm" id="chListenBtn" style="margin-left:6px">⏱</button></div>';
    h+='<p style="font-size:12px;color:var(--gray-600);line-height:1.8;margin-top:10px;background:var(--blue-light);padding:10px;border-radius:10px">💡 熏听小贴士：<br>• 不用看屏幕，听音频即可<br>• 注意力放在发音和节奏<br>• 熟悉后尝试跟读<br>• 每天10分钟，日积月累语感大幅提升</p>';
    h+='</div>';
  }else if(currentSub==='poem'){
    h+='<div class="card"><div class="card-title">📜 古诗背诵（四年级上册）</div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-bottom:8px">点击「背诵打卡」按钮记录已背会的古诗</p>';
    POEMS.forEach(function(p,i){
      var key='poem_'+i;
      var done=d[key];
      h+='<div class="poem-card"><div class="poem-title">'+p.title+(done?' ✅':'')+'</div><div class="poem-author">'+p.author+'</div><div class="poem-content">'+p.content.replace(/\n/g,'<br>')+'</div><button class="poem-recite-btn'+(done?' done':'')+'" data-poem="'+i+'">'+(done?'已背✓':'背诵打卡')+'</button></div>';
    });
    h+='</div>';
  }else if(currentSub==='read'){
    h+='<div class="card"><div class="card-title">📖 课外阅读 1小时</div>';
    h+='<div class="task-item"><div class="task-check'+(d.ch_read?' done':'')+'" data-id="ch_read">✓</div><div class="task-text'+(d.ch_read?' done':'')+'">课外阅读 1小时</div><span class="task-time" id="chReadTime">0:00</span><button class="btn btn-primary btn-sm" id="chReadBtn" style="margin-left:6px">⏱</button></div>';
    h+='<p style="font-size:12px;color:var(--gray-600);line-height:1.8;margin-top:10px;background:var(--pink-light);padding:10px;border-radius:10px">💡 阅读小贴士：<br>• 选择孩子感兴趣的课外书<br>• 读完后家长和孩子讨论内容<br>• 鼓励孩子说出自己的感想<br>• 可以做简单的读书笔记</p>';
    h+='</div>';
  }else if(currentSub==='express'){
    h+='<div class="card"><div class="card-title">💡 理解表达力训练（每日轮换）</div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-bottom:8px">每天一道不同的题型，坚持训练让理解表达能力越来越棒！</p>';
    var dayIdx=new Date().getDate()%EXPRESS.length;
    var e=EXPRESS[dayIdx];
    var key='express_'+dayIdx;
    var done=d[key];
    h+='<div class="express-card"><span class="express-type">'+e.type+'</span><div class="express-content">'+e.content.replace(/\n/g,'<br>')+'</div><div style="font-size:11px;color:var(--purple);margin-bottom:6px">💡 '+e.hint+'</div><textarea class="express-input" placeholder="在这里写你的答案…" id="expressInput">'+(d['express_text_'+dayIdx]||'')+'</textarea><button class="btn btn-primary btn-sm" style="margin-top:8px" id="expressBtn">'+(done?'已完成✅':'提交答案')+'</button></div>';
    h+='</div>';
  }
  return h;
}

// ============ 数学内容 ============
function renderMath(){
  var h='';
  if(currentSub==='map'){
    h+='<div class="card"><div class="card-title">🧠 知识思维导图</div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-bottom:8px">★难度等级 · →前后关联</p>';
    MINDMAP.forEach(function(n){
      var diffStars='';
      for(var j=0;j<n.diff;j++)diffStars+='★';
      h+='<div class="mindmap-node level'+n.level+'">'+n.name+'<span class="mindmap-difficulty diff-'+n.diff+'">'+diffStars+'</span></div>';
      if(n.relation)h+='<div class="mindmap-relation">→ '+n.relation+'</div>';
    });
    h+='</div>';
  }else if(currentSub==='concept'){
    h+='<div class="card"><div class="card-title">📋 概念公式速查表</div>';
    h+='<table class="concept-table"><tr><th>类别</th><th>名称</th><th>公式</th><th>解释</th></tr>';
    CONCEPTS.forEach(function(c){
      h+='<tr><td>'+c.cat+'</td><td>'+c.name+'</td><td>'+c.formula+'</td><td>'+c.explain+'</td></tr>';
    });
    h+='</table></div>';
  }else if(currentSub==='quiz'){
    h+='<div class="card"><div class="card-title">✏️ 分层互动练习题</div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-bottom:8px">答错看解析 · 不懂的题可一键删除同类</p>';
    h+='<div class="card-subtitle">📗 基础题</div>';
    h+=renderQuizHTML('basic',QUIZ_BASIC);
    h+='<div class="card-subtitle">📙 提高题</div>';
    h+=renderQuizHTML('improve',QUIZ_IMPROVE);
    h+='<div class="card-subtitle">📕 挑战题</div>';
    h+=renderQuizHTML('challenge',QUIZ_CHALLENGE);
    h+='</div>';
  }else if(currentSub==='life'){
    h+='<div class="card"><div class="card-title">🏠 生活化解读手册</div>';
    LIFE_MATH.forEach(function(l){
      h+='<div class="life-card"><div class="life-concept">'+l.concept+'</div><div class="life-content">'+l.life+'</div><div class="life-q">💡 '+l.q+'</div></div>';
    });
    h+='</div>';
  }else if(currentSub==='pit'){
    h+='<div class="card"><div class="card-title">⚠️ 易错点坑指南</div>';
    PITFALLS.forEach(function(p){
      h+='<div class="pit-card"><div class="pit-title">⚠️ '+p.pit+'</div>';
      h+='<div class="pit-wrong">❌错误：'+p.wrong.replace(/\n/g,'<br>')+'</div>';
      h+='<div class="pit-right">✅正确：'+p.right.replace(/\n/g,'<br>')+'</div>';
      h+='<div class="pit-tip">🔑 '+p.tip+'</div></div>';
    });
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

// ============ 英语内容 ============
function renderEnglish(){
  var d=loadTask();
  var h='';
  if(currentSub==='listen'){
    var dayIdx=new Date().getDate()%LISTENINGS.length;
    var L=LISTENINGS[dayIdx];
    h+='<div class="card"><div class="card-title">🎧 听力练习</div>';
    h+='<div class="listen-card"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><button class="listen-play" id="listenPlayBtn">▶️</button><div><div style="font-size:13px;font-weight:700">'+L.title+'</div><div style="font-size:10px;color:var(--gray-500)">点击播放听力</div></div></div>';
    h+='<div class="listen-text" id="listenText" style="display:none">'+L.text+'</div>';
    h+='<button class="btn btn-sm" id="showTextBtn" style="background:var(--orange-light);color:var(--orange);margin-bottom:8px">👁 查看原文</button>';
    L.questions.forEach(function(qi,i){
      h+='<div style="margin-bottom:8px"><div style="font-size:12px;font-weight:600;margin-bottom:5px">Q'+(i+1)+'. '+qi.q+'</div>';
      h+='<div class="quiz-options">';
      qi.options.forEach(function(opt,j){
        h+='<div class="quiz-option" data-lq="'+i+'" data-lopt="'+j+'">'+opt+'</div>';
      });
      h+='</div><div class="quiz-explain" id="lexplain_'+i+'">正确答案：'+qi.options[qi.answer]+'</div></div>';
    });
    h+='</div></div>';
  }else if(currentSub==='xueersi'){
    h+='<div class="card"><div class="card-title">📝 学而思练习册</div>';
    h+='<div class="task-item"><div class="task-check'+(d.eng_xueersi?' done':'')+'" data-id="eng_xueersi">✓</div><div class="task-text'+(d.eng_xueersi?' done':'')+'">完成学而思练习册一页</div></div>';
    h+='<p style="font-size:12px;color:var(--gray-600);margin-top:10px;line-height:1.8;background:var(--orange-light);padding:10px;border-radius:10px">💡 做题小贴士：<br>• 不认识的单词先做标记<br>• 做完一题检查一题<br>• 错题要看解析并整理笔记</p>';
    h+='</div>';
  }else if(currentSub==='words'){
    h+='<div class="card"><div class="card-title">📖 单词短语背诵</div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-bottom:8px">点击单词朗读 · 收藏⭐重点单词</p>';
    WORDS.forEach(function(u){
      h+='<div class="card-subtitle">'+u.unit+'</div>';
      u.list.forEach(function(w,i){
        var key='word_'+u.unit+'_'+i;
        var starred=d[key];
        h+='<div class="word-row"><span class="word-en">'+w.en+'</span><span class="word-cn">'+w.cn+'</span><button class="word-speak" data-en="'+w.en+'">🔊</button><span class="word-star'+(starred?' on':'')+'" data-wkey="'+key+'">⭐</span></div>';
      });
    });
    h+='</div>';
  }else if(currentSub==='grammar'){
    h+='<div class="card"><div class="card-title">📐 语法技巧总结</div>';
    h+='<p style="font-size:11px;color:var(--gray-500);margin-bottom:8px">1-6年级语法 + 背单词技巧</p>';
    GRAMMARS.forEach(function(g){
      h+='<div class="grammar-card"><div class="grammar-title">'+g.title+'</div><div class="grammar-rule">'+g.rule+'</div><div class="grammar-example">例：'+g.example+'</div></div>';
    });
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
  bindTimerBtn('chListenBtn','chListenTime','ch_listen_secs',600,'ch_listen','熏听10分钟完成！✅');
  bindTimerBtn('chReadBtn','chReadTime','ch_read_secs',3600,'ch_read','阅读1小时完成！✅');
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
  var tasks=['ch_hw','ch_review','ch_listen','ch_read'];
  POEMS.forEach(function(p,i){tasks.push('poem_'+i)});
  tasks.push('express_'+(new Date().getDate()%EXPRESS.length));
  tasks.push('eng_xueersi');
  WORDS.forEach(function(u){u.list.forEach(function(w,i){tasks.push('word_'+u.unit+'_'+i)})});
  return tasks;
}

function updateProgress(){
  var d=loadTask();
  var studyTasks=getStudyTasks();
  var done=0;studyTasks.forEach(function(t){if(d[t])done++;});
  var pct=Math.round(done/studyTasks.length*100);
  $('#progressPct').textContent=pct+'%';
  var fill=$('#progressFill');
  fill.style.width=pct+'%';
  fill.classList.toggle('qualified',pct>=70);
}

function updateSidebarCounts(){
  var d=loadTask();
  // 语文
  var chTotal=2+POEMS.length+1+1+1;//hw+review+poems+listen+read+express
  var chDone=(d.ch_hw?1:0)+(d.ch_review?1:0)+(d.ch_listen?1:0)+(d.ch_read?1:0);
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

// ============ 初始化 ============
function init(){
  setupSidebar();
  renderSubcat();
  renderContent();
  updateProgress();
  updateMelody();
}

document.addEventListener('DOMContentLoaded',init);
