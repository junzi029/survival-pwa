(() => {
  const dayEl = document.getElementById("day");
  const sceneTextEl = document.getElementById("sceneText");
  const choicesEl = document.getElementById("choices");

  const resultCard = document.getElementById("resultCard");
  const resultTitle = document.getElementById("resultTitle");
  const resultMsg = document.getElementById("resultMsg");
  const nextBtn = document.getElementById("nextBtn");
  const retryBtn = document.getElementById("retryBtn");

  const DATA = window.GAME_DATA;
  if (!DATA) throw new Error("GAME_DATA not found");

  let state = {
    sceneId: DATA.start,
    day: 1,
    lastSceneId: null
  };

  // 簡易永続化（リロードしても続き）
  const saved = localStorage.getItem("survival_state");
  if (saved) {
    try { state = JSON.parse(saved); } catch {}
  }

  const save = () => localStorage.setItem("survival_state", JSON.stringify(state));

  function render() {
    const scene = DATA.scenes[state.sceneId];
    if (!scene) throw new Error("Scene not found: " + state.sceneId);

    dayEl.textContent = String(state.day);
    sceneTextEl.textContent = scene.text;

    choicesEl.innerHTML = "";
    resultCard.style.display = "none";
    retryBtn.style.display = "none";
    nextBtn.style.display = "block";

    scene.choices.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.textContent = c.label;
      btn.onclick = () => choose(idx);
      choicesEl.appendChild(btn);
    });

    save();
  }

  function choose(choiceIndex) {
    const scene = DATA.scenes[state.sceneId];
    const choice = scene.choices[choiceIndex];
    const r = choice.result;

    resultCard.style.display = "block";
    resultMsg.textContent = r.msg || "";

    if (r.type === "next") {
      resultTitle.innerHTML = `<span class="ok">生存</span>`;
      nextBtn.onclick = () => {
        state.lastSceneId = state.sceneId;
        state.sceneId = r.to;
        state.day += 1;
        render();
      };
      retryBtn.style.display = "none";
    } else if (r.type === "death") {
      resultTitle.innerHTML = `<span class="ng">死亡</span>`;
      nextBtn.style.display = "none";
      retryBtn.style.display = "block";
      retryBtn.onclick = () => {
        // 仕様：死亡したら最初へ（広告っぽい）
        state.sceneId = DATA.start;
        state.day = 1;
        render();
      };
    } else {
      throw new Error("Unknown result type: " + r.type);
    }
  }

  // PWA: Service Worker登録
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  render();
})();
