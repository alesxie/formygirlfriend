import { useState, useEffect } from "react";

const SECRET_CODE = "053126"; // 

const hearts = ["💗", "💖", "💝", "🌸", "✨", "🌷", "💕", "🦋"];

function FloatingHearts() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 8.3) % 100}%`,
          animation: `floatUp ${4 + (i % 4)}s linear ${i * 0.5}s infinite`,
          fontSize: `${14 + (i % 3) * 6}px`,
          opacity: 0.35,
        }}>
          {hearts[i % hearts.length]}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.35; }
          90% { opacity: 0.35; }
          100% { transform: translateY(-10vh) rotate(20deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes welcomePop {
          0% { transform: scale(0.3) rotate(-5deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(2deg); }
          80% { transform: scale(0.97) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Georgia', serif; }
      `}</style>
    </div>
  );
}

// LOCK SCREEN 
function LockScreen({ onUnlock }) {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);

  const handleEnter = () => {
    if (code.toLowerCase() === SECRET_CODE) {
      onUnlock();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setCode("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #ffb6c1 0%, #ff8fab 50%, #ff6b9d 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
    }}>
      <FloatingHearts />
      <div style={{
        background: "rgba(255,255,255,0.92)", borderRadius: 26, padding: "40px 45px",
        width: 500, textAlign: "center", position: "relative", zIndex: 1,
        boxShadow: "0 20px 60px rgba(255,107,157,0.35)",
        animation: "popIn 0.6s ease-out both",
      }}>
        <div style={{ fontSize: 37, marginBottom: 8 }}>Before you enter...</div>
        <div style={{
          fontFamily: "'Georgia', serif", fontSize: 17, color: "#d63384",
          marginBottom: 6, fontStyle: "italic"
        }}>only you can unlock this special place 🌟</div>
        <div style={{ color: "#999", fontSize: 15, marginBottom: 28 }}>
          Enter our anniversary date
        </div>

        <input
          type="password"
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleEnter()}
          placeholder="Enter the secret code..."
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 50,
            border: "2px solid #ffb6c1", outline: "none", fontSize: 13,
            textAlign: "center", color: "#d63384", marginBottom: 15,
            animation: shake ? "shake 0.5s ease both" : "none",
            fontFamily: "inherit", letterSpacing: 4,
          }}
        />

        <button onClick={handleEnter} style={{
          width: "100%", padding: "13px", borderRadius: 50, border: "none",
          background: "linear-gradient(135deg, #ff6b9d, #d63384)",
          color: "#fff", fontSize: 16, fontWeight: "bold", cursor: "pointer",
          boxShadow: "0 4px 15px rgba(214,51,132,0.4)",
          animation: "pulse 2s ease infinite",
        }}>
          Enter ✨
        </button>

        <div style={{
          marginTop: 16, color: "#ffb6c1", fontSize: 12, userSelect: "none"
        }}>
          made with love 💗
        </div>
      </div>
    </div>
  );
}

// WELCOME SCREEN 
function WelcomeScreen({ onContinue }) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [showButton, setShowButton] = useState(false);

  const line1 = "Hello, my baby...";
  const line2 = "I made something special just for you :)";
  const line3 = "Every moment with you is my favorite memory 💕";

  useEffect(() => {
    let i = 0;
    const t1 = setInterval(() => {
      setText1(line1.slice(0, ++i));
      if (i === line1.length) {
        clearInterval(t1);
        let j = 0;
        const t2 = setInterval(() => {
          setText2(line2.slice(0, ++j));
          if (j === line2.length) {
            clearInterval(t2);
            let k = 0;
            const t3 = setInterval(() => {
              setText3(line3.slice(0, ++k));
              if (k === line3.length) {
                clearInterval(t3);
                setTimeout(() => setShowButton(true), 400);
              }
            }, 40);
          }
        }, 40);
      }
    }, 80);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #ffb6c1 0%, #ff8fab 50%, #ff6b9d 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      position: "relative"
    }}>
      <FloatingHearts />
      <div style={{
        position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px",
        animation: "fadeIn 0.6s ease both",
      }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>💖</div>

        <div style={{
          fontFamily: "'Georgia', serif", fontSize: 42, fontWeight: "bold",
          color: "#fff", textShadow: "0 4px 20px rgba(214,51,132,0.5)",
          marginBottom: 20, minHeight: 52,
        }}>
          {text1}<span style={{ animation: "pulse 1s infinite" }}>|</span>
        </div>

        <div style={{
          fontSize: 18, color: "rgba(255,255,255,0.9)", fontStyle: "italic",
          marginBottom: 12, minHeight: 28,
        }}>
          {text2}
        </div>

        <div style={{
          fontSize: 16, color: "rgba(255,255,255,0.8)",
          marginBottom: 48, minHeight: 24,
        }}>
          {text3}
        </div>

        {showButton && (
          <button onClick={onContinue} style={{
            padding: "16px 48px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.25)", color: "#fff", fontSize: 18,
            cursor: "pointer", backdropFilter: "blur(8px)",
            fontFamily: "'Georgia', serif", fontStyle: "italic",
            boxShadow: "0 8px 32px rgba(214,51,132,0.3)",
            animation: "popIn 0.5s ease both",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.4)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          >
            Open Memories 💝
          </button>
        )}
      </div>
    </div>
  );
}

// NAV BAR 
function NavBar({ active, setActive }) {
  const tabs = [
    { id: "home", label: "🏠 Home" },
    { id: "gallery", label: "🖼️ Gallery" },
    { id: "notes", label: "📝 Notes" },
    { id: "music", label: "🎵 Music" },
    { id: "surprise", label: "🎁 Surprise" },
  ];
  return (
    <nav style={{
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #ffe0ea", position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 20px rgba(255,107,157,0.15)"
    }}>
      <div style={{
        maxWidth: 700, margin: "0 auto", display: "flex",
        justifyContent: "space-around", padding: "0 8px"
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: "14px 10px", border: "none", background: "none",
            color: active === t.id ? "#d63384" : "#aaa",
            fontWeight: active === t.id ? "bold" : "normal",
            fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            borderBottom: active === t.id ? "3px solid #d63384" : "3px solid transparent",
            whiteSpace: "nowrap",
          }}>
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// HOME
function HomeTab() {
  return (
    <div style={{ padding: "40px 24px", maxWidth: 600, margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 60 }}>💕</div>
        <h1 style={{
          fontFamily: "'Georgia', serif", fontSize: 36, color: "#d63384",
          marginTop: 12, fontStyle: "italic"
        }}>Hello, my love 🌸</h1>
        <p style={{ color: "#888", marginTop: 12, lineHeight: 1.7, fontSize: 16 }}>
          I made this little website just for you — a space where I keep everything that reminds me of us. 
          Explore and feel how much you mean to me. 💖
        </p>
      </div>

      {[
        { emoji: "🖼️", title: "Our Gallery", desc: "Photos and memories of us and rayu", tab: null },
        { emoji: "📝", title: "Love Notes", desc: "Things I want you to always remember", tab: null },
        { emoji: "🎵", title: "Our Playlist", desc: "Songs that remind me of you", tab: null },
        { emoji: "🎁", title: "A Surprise", desc: "Something special just for you :)", tab: null },
      ].map((card, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.9)", borderRadius: 20, padding: "20px 24px",
          marginBottom: 16, display: "flex", alignItems: "center", gap: 16,
          boxShadow: "0 4px 20px rgba(255,107,157,0.1)",
          border: "1px solid #ffe0ea", transition: "transform 0.2s",
          cursor: "default",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{ fontSize: 32 }}>{card.emoji}</div>
          <div>
            <div style={{ fontWeight: "bold", color: "#d63384", fontSize: 16 }}>{card.title}</div>
            <div style={{ color: "#aaa", fontSize: 13 }}>{card.desc}</div>
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 32, padding: "24px", background: "linear-gradient(135deg, #ffe0ea, #ffc2d4)",
        borderRadius: 20, textAlign: "center"
      }}>
        <div style={{ fontSize: 28 }}>🌷</div>
        <p style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#c2185b", marginTop: 8, lineHeight: 1.6 }}>
          "Every love story is beautiful, but ours is my favorite."
        </p>
      </div>
    </div>
  );
}

// GALLERY
function GalleryTab() {
  const [activeTab, setActiveTab] = useState("me");
  const [selected, setSelected] = useState(null);

  const photos = {
    me: Array.from({ length: 8 }, (_, i) => `/images/me/photo${i + 1}.jpg`),
    her: Array.from({ length: 14 }, (_, i) => `/images/her/photo${i + 1}.jpg`),
    rayu: Array.from({ length: 9 }, (_, i) => `/images/rayu/photo${i + 1}.jpg`),
  };

  const tabs = [
    { id: "me", label: "Me 🌸" },
    { id: "her", label: "You 💕" },
    { id: "rayu", label: "Rayu 🐾" },
  ];

  return (
    <div style={{ padding: "32px 24px", maxWidth: 640, margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      <h2 style={{ textAlign: "center", color: "#d63384", fontFamily: "'Georgia', serif", fontSize: 28, marginBottom: 8 }}>
        Our Gallery 🖼️
      </h2>
      <p style={{ textAlign: "center", color: "#bbb", marginBottom: 24, fontSize: 14 }}>
        Me, you, and our little Rayu 🐾
      </p>

      {/* Tabs */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 12, marginBottom: 24
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "10px 24px", borderRadius: 50, cursor: "pointer",
            background: activeTab === t.id
              ? "linear-gradient(135deg, #ff6b9d, #d63384)"
              : "rgba(255,255,255,0.9)",
            color: activeTab === t.id ? "#fff" : "#d63384",
            fontWeight: "bold", fontSize: 14,
            boxShadow: activeTab === t.id
              ? "0 4px 14px rgba(214,51,132,0.35)"
              : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s",
            // avoid duplicate 'border' property; set conditional outline instead
            outline: activeTab === t.id ? "none" : "2px solid #ffb6c1",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {photos[activeTab].map((src, i) => (
          <div key={i} onClick={() => setSelected(src)} style={{
            borderRadius: 16, overflow: "hidden", aspectRatio: "1",
            cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "#ffe0ea",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(214,51,132,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
          >
            <img
              src={src}
              alt={`photo-${i}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => {
                const parent = e.currentTarget.parentNode;
                if (parent) {
                  parent.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:32px">📷</div>';
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}>
          <div style={{ position: "relative", animation: "popIn 0.3s ease" }}>
            <img
              src={selected}
              alt="selected"
              style={{
                maxWidth: "90vw", maxHeight: "85vh",
                borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                objectFit: "contain",
              }}
            />
            <div style={{
              position: "absolute", top: -16, right: -16,
              background: "#d63384", color: "#fff", borderRadius: "50%",
              width: 36, height: 36, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", fontSize: 18,
              boxShadow: "0 4px 12px rgba(214,51,132,0.4)"
            }}>
              ✕
            </div>
            <div style={{ textAlign: "center", marginTop: 12, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              Tap anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// NOTES
const NOTES = [
  {
    title: "Why I love you 💖",
    content: "I love how you came into my life and made everything brighter. I love the way you make me feel seen, heard, and loved. I love how you make every ordinary day feel special. I love that you're mine.",
    color: "#ffb3c6",
  },
  {
    title: "Things I never want you to forget 🌸",
    content: "You are more than enough. You are beautiful, inside and out. Even on the days you don't feel it — I see it. I am so lucky to have you in my life. Never doubt how much I love you.",
    color: "#ffc2d4",
  },
  {
    title: "My favorite thing about us ✨",
    content: "The way we talk for hours and it never feels enough. The late night calls, the good morning and good night messages — these are the moments I treasure most.",
    color: "#ffd6e0",
  },
  {
    title: "Late night thoughts 🌙",
    content: "Some nights I just lie there thinking about you. Wishing you were closer. Wishing I could see your face, hear your laugh for real. I miss you in a way I can't fully explain — and we haven't even met yet. That's how much you mean to me.",
    color: "#ffe0ea",
  },
  {
    title: "My dream for us 🛫",
    content: "One day — I don't know when, but I know it'll happen — I'll finally get to see you and I think that day is going to feel like the best day of my life. I'm willing to wait for it. You're worth every second.",
    color: "#fce4ec",
  },
];

function NotesTab() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      <h2 style={{ textAlign: "center", color: "#d63384", fontFamily: "'Georgia', serif", fontSize: 28, marginBottom: 8 }}>
        Love Notes 📝
      </h2>
      <p style={{ textAlign: "center", color: "#bbb", marginBottom: 28, fontSize: 14 }}>
        A letters for you 💌
      </p>
      {NOTES.map((note, i) => (
        <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{
          background: note.color, borderRadius: 20, padding: "20px 24px",
          marginBottom: 16, cursor: "pointer", transition: "all 0.3s ease",
          boxShadow: open === i ? "0 8px 28px rgba(214,51,132,0.2)" : "0 4px 12px rgba(0,0,0,0.05)",
          transform: open === i ? "scale(1.01)" : "scale(1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: "bold", color: "#d63384", fontSize: 16 }}>{note.title}</div>
            <div style={{ color: "#d63384", fontSize: 18 }}>{open === i ? "▲" : "▼"}</div>
          </div>
          {open === i && (
            <div style={{
              marginTop: 16, color: "#555", lineHeight: 1.8, fontSize: 15,
              fontFamily: "'Georgia', serif", fontStyle: "italic",
              animation: "fadeIn 0.3s ease"
            }}>
              {note.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// MUSIC 
const SONGS = [
  { title: "Call It What You Want", artist: "Taylor Swift", emoji: "✨", spotifyId: "1GwMQaZz6Au3QLDbjbMdme" },
  { title: "Cornelia Street", artist: "Taylor Swift", emoji: "🗽", spotifyId: "12M5uqx0ZuwkpLp5rJim1a" },
  { title: "Daylight", artist: "Taylor Swift", emoji: "☀️", spotifyId: "1fzAuUVbzlhZ1lJAx9PtY6" },
  { title: "Dress", artist: "Taylor Swift", emoji: "🤍", spotifyId: "6oVxXO5oQ4pTpO8RSnkzvv" },
  { title: "Enchanted", artist: "Taylor Swift", emoji: "💜", spotifyId: "04S1pkp1VaIqjg8zZqknR5" },
  { title: "Everything Has Changed", artist: "Taylor Swift ft. Ed Sheeran", emoji: "💫", spotifyId: "7qEUFOVcxRI19tbT68JcYK" },
  { title: "Labyrinth", artist: "Taylor Swift", emoji: "💖", spotifyId: "0A1JLUlkZkp2EFrosoNQi0" },
  { title: "Lover", artist: "Taylor Swift", emoji: "💕", spotifyId: "1dGr1c8CrMLDpV6mPbImSI" },
   { title: "New Year's Day", artist: "Taylor Swift", emoji: "🎇", spotifyId: "7F5oktn5YOsR9eR5YsFtqb" },
  { title: "So High School", artist: "Taylor Swift", emoji: "🏈", spotifyId: "1GP8VW5Wk2w2obkWjGCGXd" },
  { title: "This Love", artist: "Taylor Swift", emoji: "❤️", spotifyId: "5QVVjX0ZItqlVpEuVCM9Yg" },
  { title: "Treacherous", artist: "Taylor Swift", emoji: "🍂", spotifyId: "3S7HNKPakdwNEBFIVTL6dZ" },
  { title: "You Are In Love", artist: "Taylor Swift", emoji: "💘", spotifyId: "4UwqOWDpdeIDVQDuKT6iza" },
];

function MusicTab() {
  const [playing, setPlaying] = useState(null);
  return (
    <div style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      <h2 style={{ textAlign: "center", color: "#d63384", fontFamily: "'Georgia', serif", fontSize: 28, marginBottom: 8 }}>
        Our Love in Songs 💕
      </h2>
      <p style={{ textAlign: "center", color: "#bbb", marginBottom: 24, fontSize: 14 }}>
        Songs that remind me of you 💗
      </p>

      {playing && (
        <div style={{
          marginBottom: 24, borderRadius: 20, overflow: "hidden",
          boxShadow: "0 8px 24px rgba(214,51,132,0.2)", animation: "fadeIn 0.4s ease"
        }}>
          <iframe
            title={`Spotify player ${playing || "track"}`}
            src={`https://open.spotify.com/embed/track/${playing}?utm_source=generator&theme=0`}
            width="100%" height="152" frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy" style={{ display: "block" }}
          />
        </div>
      )}

      {SONGS.map((song, i) => (
        <div key={i} onClick={() => setPlaying(song.spotifyId === playing ? null : song.spotifyId)} style={{
          background: playing === song.spotifyId ? "linear-gradient(135deg, #ffe0ea, #ffc2d4)" : "rgba(255,255,255,0.9)",
          borderRadius: 16, padding: "16px 20px", marginBottom: 12,
          display: "flex", alignItems: "center", gap: 14,
          cursor: "pointer", transition: "all 0.2s",
          boxShadow: playing === song.spotifyId ? "0 4px 16px rgba(214,51,132,0.2)" : "0 2px 8px rgba(0,0,0,0.06)",
          border: playing === song.spotifyId ? "2px solid #ffb6c1" : "2px solid transparent",
        }}
          onMouseEnter={e => { if (playing !== song.spotifyId) e.currentTarget.style.background = "#fff5f8"; }}
          onMouseLeave={e => { if (playing !== song.spotifyId) e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
        >
          <div style={{ fontSize: 28 }}>{song.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", color: "#d63384", fontSize: 15 }}>{song.title}</div>
            <div style={{ color: "#aaa", fontSize: 13 }}>{song.artist}</div>
          </div>
          <div style={{ fontSize: 22 }}>{playing === song.spotifyId ? "⏸" : "▶️"}</div>
        </div>
      ))}
    </div>
  );
}

// SURPRISE
function SurpriseTab() {
  const [revealed, setRevealed] = useState(false);
  const [count, setCount] = useState(0);

  const reasons = [
  "Your laugh is my favorite sound 😄",
  "You're the first person I want to tell everything to 📱",
  "You look beautiful even on your worst days 🌸",
  "You're my home, no matter where we are 🏠",
  "I fall for you more every single day 💫",
  "You are my greatest adventure 🗺️",
  "You are my source of happiness — on my best days and especially on my worst 🌤️",
  "You loved me even when I was at my lowest, and that means everything to me 💗",
  "You taught me so many things — about life, about love, about myself 📖",
  "You always find a way to understand me, even when I can't find the words 🤝",
  "You made me realize I am capable of loving someone this deeply — and that someone is you ❤️",
  "You always make sure I'm okay before you do anything — that kind of care is rare 🫶",
  "With you, I always feel safe. You are my assurance 🕊️",
  "I love that you're willing to grow and learn with me — together 🌱",
  "I can see my future, and you're in every single part of it 🔮",
  "You wrote me letters — and I will keep every single one forever 💌",
];

  return (
    <div style={{ padding: "32px 24px", maxWidth: 600, margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      <h2 style={{ textAlign: "center", color: "#d63384", fontFamily: "'Georgia', serif", fontSize: 28, marginBottom: 8 }}>
        My Surprise 🎁
      </h2>
      <p style={{ textAlign: "center", color: "#bbb", marginBottom: 32, fontSize: 14 }}>
        Something I prepared just for you 🌷
      </p>

      {!revealed ? (
        <div style={{ textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, #ffe0ea, #ffd6e7)",
            borderRadius: 24, padding: "48px 32px",
            boxShadow: "0 8px 32px rgba(214,51,132,0.15)"
          }}>
            <div style={{ fontSize: 80, animation: "pulse 1.5s ease infinite" }}>🎁</div>
            <div style={{ marginTop: 20, color: "#d63384", fontFamily: "'Georgia', serif", fontSize: 20, fontStyle: "italic" }}>
              Are you ready?
            </div>
            <div style={{ color: "#aaa", fontSize: 14, marginTop: 8, marginBottom: 28 }}>
              I wrote {reasons.length} reasons why I love you
            </div>
            <button onClick={() => setRevealed(true)} style={{
              padding: "14px 40px", borderRadius: 50,
              background: "linear-gradient(135deg, #ff6b9d, #d63384)",
              border: "none", color: "#fff", fontSize: 17, cursor: "pointer",
              boxShadow: "0 6px 20px rgba(214,51,132,0.4)",
              fontFamily: "'Georgia', serif", fontStyle: "italic",
              animation: "pulse 2s ease infinite",
            }}>
              Open your gift 💝
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{
            background: "linear-gradient(135deg, #fff0f5, #ffd6e7)",
            borderRadius: 24, padding: "32px", textAlign: "center", marginBottom: 20,
            animation: "welcomePop 0.5s ease both"
          }}>
            <div style={{ fontSize: 40 }}>💌</div>
            <div style={{
              fontFamily: "'Georgia', serif", fontSize: 18, color: "#d63384",
              fontStyle: "italic", marginTop: 12, lineHeight: 1.7
            }}>
              {reasons[count % reasons.length]}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setCount(c => c + 1)} style={{
              padding: "12px 28px", borderRadius: 50,
              background: "linear-gradient(135deg, #ff6b9d, #d63384)",
              border: "none", color: "#fff", fontSize: 15, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(214,51,132,0.35)"
            }}>
              Next reason 💕
            </button>
            <button onClick={() => { setRevealed(false); setCount(0); }} style={{
              padding: "12px 28px", borderRadius: 50,
              background: "rgba(255,255,255,0.8)", border: "2px solid #ffb6c1",
              color: "#d63384", fontSize: 15, cursor: "pointer"
            }}>
              Read again 🔄
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 16, color: "#ddd", fontSize: 13 }}>
            {(count % reasons.length) + 1} of {reasons.length} reasons 🌸
          </div>
        </div>
      )}
    </div>
  );
}

// MAIN APP
export default function App() {
  const [stage, setStage] = useState("lock");
  const [tab, setTab] = useState("home");

  if (stage === "lock") return <LockScreen onUnlock={() => setStage("welcome")} />;
  if (stage === "welcome") return <WelcomeScreen onContinue={() => setStage("main")} />;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)" }}>
      <NavBar active={tab} setActive={setTab} />
      {tab === "home" && <HomeTab />}
      {tab === "gallery" && <GalleryTab />}
      {tab === "notes" && <NotesTab />}
      {tab === "music" && <MusicTab />}
      {tab === "surprise" && <SurpriseTab />}
      <div style={{ textAlign: "center", padding: "24px 16px", color: "#ffb6c1", fontSize: 13 }}>
        Made with love 💗
      </div>
    </div>
  );
}
