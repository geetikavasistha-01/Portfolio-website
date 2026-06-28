import { useRef, useCallback } from "react";
import { useUIStore } from "../store/uiStore";

export function useDarkModeRipple(rootRef: React.RefObject<HTMLElement>) {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const isDark = theme === 'dark';

  const enabledRef = useRef(true);
  const scrollRef = useRef(0);

  const toggle = useCallback(() => {
    if (!enabledRef.current || !rootRef.current) return;
    enabledRef.current = false;

    const clip = document.getElementById("clip-portal")!;
    const root = rootRef.current;

    // 1. Snapshot current scroll
    scrollRef.current = document.documentElement.scrollTop || window.scrollY;

    // 2. Clone the root into the clip portal
    const clone = root.cloneNode(true) as HTMLElement;

    // 3. Toggle theme classes on the clone (this is the NEW theme being revealed)
    const willBeDark = !isDark;
    if (willBeDark) {
      clone.classList.add("dark");
      clone.classList.add("dark-theme");
      clone.classList.remove("light-theme");
    } else {
      clone.classList.remove("dark");
      clone.classList.remove("dark-theme");
      clone.classList.add("light-theme");
    }

    // 4. Restore scroll position on the clone
    clone.scrollTop = scrollRef.current;

    // 5. Counter-invert images and videos inside the clone so they render correctly
    clone.querySelectorAll("img, video").forEach((el) => {
      (el as HTMLElement).style.filter = "invert(1)";
    });

    // 6. Set clip portal size and add clone
    clip.style.width = "0";
    clip.style.height = "0";
    clip.style.clipPath = "circle(0rem at center)";
    clip.innerHTML = "";
    clip.appendChild(clone);

    // 5b. Keep scroll synced between root and clone in real-time during transition
    const syncScroll = () => {
      scrollRef.current = document.documentElement.scrollTop || window.scrollY;
      clone.scrollTop = scrollRef.current;
    };
    window.addEventListener("scroll", syncScroll);

    // 7. Animate: expand circle from bottom-left to cover entire screen
    clip.animate(
      [
        {
          bottom: "3rem", left: "3rem",
          width: "0", height: "0",
          clipPath: "circle(0rem at center)",
        },
        {
          bottom: "calc(-250vmax + 3rem)", left: "calc(-250vmax + 3rem)",
          width: "500vmax", height: "500vmax",
          clipPath: "circle(100% at center)",
        },
      ],
      { duration: 1000, easing: "ease-in", fill: "forwards" }
    );

    // 8. After ~850ms (circle has covered screen), commit real theme & clean up
    setTimeout(() => {
      // Toggle theme in global Zustand store
      toggleTheme();

      // Clean up event listener and portal contents
      window.removeEventListener("scroll", syncScroll);
      document.documentElement.scrollTop = scrollRef.current;
      window.scrollTo(0, scrollRef.current);
      clip.innerHTML = "";
      clip.style.width = "0";
      clip.style.height = "0";
      clip.style.clipPath = "circle(0rem at center)";
      enabledRef.current = true;
    }, 850);
  }, [isDark, toggleTheme, rootRef]);

  return { isDark, toggle };
}
