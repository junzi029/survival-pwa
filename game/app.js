// 1ステージ=1判断。結果は next(次シーン) か death(死亡)。
window.GAME_DATA = {
  start: "s1",
  scenes: {
    s1: {
      text: "吹雪。体感-40℃。手袋が凍り始めた。最初にやる？",
      choices: [
        { label: "木材を集める", result: { type: "next", to: "s2", msg: "乾いた枝を確保。火の準備ができた。" } },
        { label: "人を助ける", result: { type: "death", msg: "立ち止まった瞬間、指先の感覚が消えた。凍傷。" } },
        { label: "雪を食べて落ち着く", result: { type: "death", msg: "体温が一気に奪われた。判断が寒い。" } }
      ]
    },
    s2: {
      text: "風が強い。火はつくがすぐ消える。どうする？",
      choices: [
        { label: "風よけを作る", result: { type: "next", to: "s3", msg: "壁ができた。火が安定する。" } },
        { label: "火に近づく", result: { type: "death", msg: "近づきすぎて服に引火。寒さより熱い。" } },
        { label: "走って体温を上げる", result: { type: "death", msg: "汗が凍って逆効果。体温が落ちた。" } }
      ]
    },
    s3: {
      text: "夜。食料がない。見つかったのは…",
      choices: [
        { label: "缶詰(凍ってる)", result: { type: "next", to: "win", msg: "火で解凍。勝った。" } },
        { label: "生肉(謎)", result: { type: "death", msg: "寄生虫ガチャ。外れ。" } },
        { label: "何も食べない", result: { type: "death", msg: "判断力が落ちた。朝を迎えられない。" } }
      ]
    },
    win: {
      text: "生存。たぶん明日も地獄。続ける？",
      choices: [
        { label: "もう1回", result: { type: "next", to: "s1", msg: "地獄は周回コンテンツだった。" } },
        { label: "やめる", result: { type: "death", msg: "あなたは“現実”に戻った。" } }
      ]
    }
  }
};
