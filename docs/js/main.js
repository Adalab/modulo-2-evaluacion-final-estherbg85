const l = document.querySelector(".js_charactersUl"),
  g = document.querySelector(".js_favoritesUl"),
  p = document.querySelector(".js_btnSearch"),
  f = document.querySelector(".js_searchInput"),
  u = document.querySelector(".js_favorites_characters"),
  m = document.querySelector(".js_characters"),
  _ = document.querySelector(".js_btndelete"),
  y = document.querySelector(".js_header"),
  c = document.createElement("img"),
  S = new URL(
    "" +
      new URL("../assets/castillo-de-disneyland-q1m7w5s7yhgo7r1d-f039bb4e.jpg")
        .href,
    self.location
  );
c.className = "header_img";
c.src = S;
c.alt = "castillo disney de noche";
c.id = "image01";
c.dataset.invent = "imagen001";
y.appendChild(c);
let a = [],
  r = [];
const d = (t, e) => `
        <li class="js_characters_item characters_item ${e}" id="${t._id}">
            <img class="characters_img" src="${t.imageUrl}"/>
            <h2 class="characters_name">${t.name}</h2>
        </li>`,
  h = (t) => {
    let e = "";
    for (const s of t)
      r.find((v) => v._id === s._id) === void 0
        ? (e += d(s, ""))
        : (e += d(s, "favorite"));
    l.innerHTML = e;
    const n = document.querySelectorAll(".js_characters_item");
    for (const s of n) s.addEventListener("click", j);
  },
  i = () => {
    let t = "";
    for (const e of r) t += d(e, "favorite");
    (g.innerHTML = t), L();
  },
  L = () => {
    r.length === 0
      ? (u.classList.add("display"),
        m.classList.add("without_favorites"),
        l.classList.add("favoritesul"))
      : (u.classList.remove("display"),
        m.classList.remove("without_favorites"),
        l.classList.remove("favoritesul"));
  },
  j = (t) => {
    t.currentTarget.classList.toggle("favorite");
    const e = parseInt(t.currentTarget.id),
      n = a.find((o) => o._id === e),
      s = r.findIndex((o) => o._id === e);
    s === -1 ? (r.push(n), i()) : (r.splice(s, 1), i()),
      localStorage.setItem("charactersFavs", JSON.stringify(r));
  };
p.addEventListener("click", (t) => {
  t.preventDefault(),
    fetch(
      "https://api.disneyapi.dev/character?" +
        new URLSearchParams({ pageSize: "50", name: f.value })
    )
      .then((e) => e.json())
      .then((e) => {
        console.log(e.info.count),
          e.info.count === 1 ? ((a = []), a.push(e.data)) : (a = e.data),
          console.log(e),
          a.forEach((s) => {
            s.imageUrl === void 0 &&
              (s.imageUrl =
                "https://placehold.co/400x400/ffffff/555555?text=Disney");
          }),
          h(a);
      }),
    (f.value = "");
});
_.addEventListener("click", (t) => {
  t.preventDefault(), (r = []), i(), h(a);
});
fetch("https://api.disneyapi.dev/character?pageSize=50")
  .then((t) => t.json())
  .then((t) => {
    (a = t.data),
      a.forEach((e) => {
        e.imageUrl === void 0 &&
          (e.imageUrl =
            "https://placehold.co/400x400/ffffff/555555?text=Disney");
      }),
      h(a);
  });
localStorage.getItem("charactersFavs") !== null &&
  ((r = JSON.parse(localStorage.getItem("charactersFavs"))), i());
//# sourceMappingURL=main.js.map
