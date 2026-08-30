(function() {
  const imgUrl = "https://i.pinimg.com/736x/dd/0e/ae/dd0eae4117ac6547443d5e27cd571f7c.jpg";

  const backdrop = document.createElement("div");
  backdrop.style.position = "fixed";
  backdrop.style.top = "0";
  backdrop.style.left = "0";
  backdrop.style.width = "100%";
  backdrop.style.height = "100%";
  backdrop.style.background = "rgba(0, 0, 0, 0.9)";
  backdrop.style.zIndex = "9998";
  backdrop.style.opacity = "0";
  backdrop.style.transition = "opacity 0.3s ease";
  backdrop.onclick = () => {
    popup.style.opacity = "0";
    backdrop.style.opacity = "0";
    setTimeout(() => {
      popup.remove();
      backdrop.remove();
    }, 300);
  };

  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.width = "100vw";
  popup.style.height = "100vh";
  popup.style.background = "#000";
  popup.style.padding = "0";
  popup.style.zIndex = "9999";
  popup.style.overflow = "hidden";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.3s ease";

  const img = document.createElement("img");
  img.src = imgUrl;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";

  const close = document.createElement("button");
  close.innerHTML = "&times;";
  close.style.position = "absolute";
  close.style.top = "15px";
  close.style.right = "15px";
  close.style.width = "44px";
  close.style.height = "44px";
  close.style.borderRadius = "50%";
  close.style.border = "none";
  close.style.background = "rgba(255, 255, 255, 0.15)";
  close.style.color = "#fff";
  close.style.fontSize = "32px";
  close.style.fontWeight = "bold";
  close.style.cursor = "pointer";
  close.style.backdropFilter = "blur(10px)";
  close.style.webkitBackdropFilter = "blur(10px)";
  close.style.transition = "all 0.2s ease";
  close.style.lineHeight = "1";
  close.style.zIndex = "10000";
  close.onmouseover = function() {
    this.style.background = "rgba(255, 255, 255, 0.35)";
    this.style.transform = "scale(1.15)";
  };
  close.onmouseout = function() {
    this.style.background = "rgba(255, 255, 255, 0.15)";
    this.style.transform = "scale(1)";
  };
  close.onclick = function(e) {
    e.stopPropagation();
    popup.style.opacity = "0";
    backdrop.style.opacity = "0";
    setTimeout(() => {
      popup.remove();
      backdrop.remove();
    }, 300);
  };

  popup.appendChild(img);
  popup.appendChild(close);

  document.body.appendChild(backdrop);
  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    setTimeout(() => {
      popup.style.opacity = "1";
      backdrop.style.opacity = "1";
    }, 10);
  });
})();
