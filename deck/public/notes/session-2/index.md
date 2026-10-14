# 第二场｜From Answers to Actions

独立 Atlas 演示：**Computer Use → Jev → RSI**。共 **19 页**，其中 3 页是各章独立的术语开场。定义口播从原来的首个内容页移到开场页；页内口播对应当前留住的画面。

- [中文讲稿](speaker-notes-zh.md)
- [English script](speaker-notes-en.md)
- [中英对照排练稿](speaker-notes-bilingual.md)
- [术语、来源与事实边界](reference.md)
- [进入观众页](/session-2) · [回到两场目录](/)

## 现场怎么讲

1. 从观众页底部打开 **Presenter ↗**，把观众页放到投影，讲者窗口留在自己的屏幕。
2. 看 Presenter 中当前画面的口播和下一次点击的预告。
3. **动画默认不播放。**主按钮先进入下一画面或下一页；再点同一个按钮上的 **Play animation / 播放动画** 才开始。短过渡后自动停住，讲多久都可以。Blender 影片也等待点击播放。
4. 每章先停在独立的术语开场页，讲完再点 **Next page** 进入例子。直接跳到动画页或刷新时，先准备好画面，等待点击开始。

动画的过渡进度只表示画面变化，不是讲解倒计时。画面停住后不会自行继续，也不要求边播放边把口播念完。讲稿中的短引用块标出留住的画面，不用念；实际演讲选中文或英文，不需要两遍都读。

## 控制与停留

| 操作 | 作用 |
| --- | --- |
| 主按钮 / Space / → / Page Down / N | 待播放时开始当前画面；过渡中暂停；暂停后续播；停住后进入下一画面或下一页 |
| 上一步 / ← / Page Up | 回到上一画面，留住它的结果 |
| 重播 / R | 只重播当前画面的过渡 |
| Presenter：直接到讲解画面 | 直接留住当前画面的结果 |
| 章节名 / 页内进度轨道 | 章节名进入独立术语页；进度轨道进入指定页面，动画等待点击开始 |
| Sources / S | 查看来源；Escape 关闭 |

例如 C4 先留住定位结果，讲清 context 与 UI grounding；继续后留住已填好的表单，再讲 tool call；最后才到回执验证。R4 会先留住 B 未检查的结果，等观众判断后再揭晓。口播内容仍是原来的主线，只把画面保留到你讲完。

## 章节开场

- [Computer Use](/session-2#computer-use/C0)
- [Jev · System One model](/session-2#jev/J0)
- [RSI · Recursive Self-Improvement](/session-2#rsi/R0)

## 从中段排练

- [C4：截图、定位、操作、验证](/session-2#computer-use/C4)
- [C5：弹窗失败与恢复](/session-2#computer-use/C5)
- [C7：训练改变 weights，使用时更新 context](/session-2#computer-use/C7)
- [C6：30 秒 Blender 成片与制作流程](/session-2#computer-use/C6)
- [J2：Decoding](/session-2#jev/J2)
- [J5：训练反馈与独立新题](/session-2#jev/J5)
- [J1：自己定义问题，一题变两题](/session-2#jev/J1)
- [J3：逐 token 生成与并行概率输出](/session-2#jev/J3)
- [J8：速度差异从哪里来，什么任务值得用](/session-2#jev/J8)
- [R4：更省操作，是否值得留下](/session-2#rsi/R4)
- [R5：Gemini 改进训练 Gemini 的工具](/session-2#rsi/R5)
- [R6：同一项改进怎样可能进入下一轮](/session-2#rsi/R6)

## 开讲前确认

确认 Presenter 与观众页同步；试一次继续、回退和重播，检查操作只影响当前画面。C6 的本地影片默认静音，约 30 秒，失败时显示案例静帧；播放结束后停住，可以再解释制作流程。它是创作成片，不是操作录像。

所有教学过程无需模型密钥或在线请求；排序候选是预写、在本地真实执行的程序。来源和例子边界见[参考稿](reference.md)。

讲稿与 Presenter 共用同一份分镜口播。修改后运行讲稿生成器即可同步三个版本；生成器会校验页面顺序、双语字段、画面口播和终点。整场时长请以实际排练为准。
