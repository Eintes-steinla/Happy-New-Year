// ==================== CẤU HÌNH ====================
// Cấu hình thông tin Tết cho các năm
const TET_CONFIG = {
  2025: {
    date: "2025-01-29T00:00:00", // Tết Ất Tỵ
    lunarYear: "Ất Tỵ",
    zodiac: "🐍", // Con Rắn
    gregorianYear: 2025,
  },
  2026: {
    date: "2026-02-17T00:00:00", // Tết Bính Ngọ
    lunarYear: "Bính Ngọ",
    zodiac: "🐴", // Con Ngựa
    gregorianYear: 2026,
  },
  2027: {
    date: "2027-02-06T00:00:00", // Tết Đinh Mùi
    lunarYear: "Đinh Mùi",
    zodiac: "🐐", // Con Dê
    gregorianYear: 2027,
  },
  2028: {
    date: "2028-01-26T00:00:00", // Tết Mậu Thân
    lunarYear: "Mậu Thân",
    zodiac: "🐵", // Con Khỉ
    gregorianYear: 2028,
  },
  2029: {
    date: "2029-02-13T00:00:00", // Tết Kỷ Dậu
    lunarYear: "Kỷ Dậu",
    zodiac: "🐓", // Con Gà
    gregorianYear: 2029,
  },
  2030: {
    date: "2030-02-03T00:00:00", // Tết Canh Tuất
    lunarYear: "Canh Tuất",
    zodiac: "🐕", // Con Chó
    gregorianYear: 2030,
  },
};

// ==================== HÀM XÁC ĐỊNH NĂM TẾT ====================
function getNextTetYear() {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Kiểm tra các năm từ năm hiện tại
  for (let year = currentYear; year <= currentYear + 10; year++) {
    if (TET_CONFIG[year]) {
      const tetDate = new Date(TET_CONFIG[year].date);
      // Nếu Tết chưa đến hoặc đang trong năm Tết
      if (tetDate > now) {
        return year;
      }
    }
  }

  // Mặc định trả về năm hiện tại nếu không tìm thấy
  return currentYear;
}

// Lấy năm Tết tiếp theo
const CURRENT_TET_YEAR = getNextTetYear();
const TET_INFO = TET_CONFIG[CURRENT_TET_YEAR];

// Kiểm tra xem có cấu hình cho năm này không
if (!TET_INFO) {
  console.error(
    `Chưa có cấu hình cho Tết năm ${CURRENT_TET_YEAR}. Vui lòng cập nhật TET_CONFIG.`,
  );
}

const tetDate = new Date(TET_INFO.date).getTime();
let celebrationShown = false;

// ==================== CẬP NHẬT TIÊU ĐỀ ====================
function updateTitles() {
  const headerTitle = document.getElementById("headerTitle");
  const celebrationYear = document.getElementById("celebrationYear");
  const zodiacIcon = document.getElementById("zodiacIcon");
  const celebrationZodiac = document.getElementById("celebrationZodiac");
  const celebrationZodiac2 = document.getElementById("celebrationZodiac2");

  const title = `Tết Nguyên Đán ${TET_INFO.gregorianYear}`;
  const celebrationTitle = `Tết ${TET_INFO.lunarYear} ${TET_INFO.gregorianYear}`;

  if (headerTitle) headerTitle.textContent = `\u00A0${title}\u00A0`;
  if (celebrationYear) celebrationYear.textContent = celebrationTitle;
  if (zodiacIcon) zodiacIcon.textContent = TET_INFO.zodiac;
  if (celebrationZodiac) celebrationZodiac.textContent = TET_INFO.zodiac;
  if (celebrationZodiac2) celebrationZodiac2.textContent = TET_INFO.zodiac;

  // Cập nhật title trang
  document.title = title;
}

// ==================== PHÁO HOA ====================
function createFirework(x, y) {
  const colors = [
    "#ff0000",
    "#ffd700",
    "#ff69b4",
    "#00ff00",
    "#00ffff",
    "#ff8c00",
    "#ff1493",
  ];
  const container = document.getElementById("fireworksContainer");

  // Tạo 30 particle cho mỗi pháo hoa
  for (let i = 0; i < 30; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    firework.style.left = x + "px";
    firework.style.top = y + "px";
    firework.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty("--x", tx + "px");
    firework.style.setProperty("--y", ty + "px");
    firework.style.animationDelay = Math.random() * 0.2 + "s";

    container.appendChild(firework);

    // Xóa particle sau khi animation kết thúc
    setTimeout(() => {
      firework.remove();
    }, 1500);
  }
}

function startFireworks() {
  const interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7;
    createFirework(x, y);
  }, 300);

  return interval;
}

function showCelebration() {
  const screen = document.getElementById("celebrationScreen");
  screen.classList.add("active");
  celebrationShown = true;

  // Bắt đầu pháo hoa
  const fireworksInterval = startFireworks();
  globalThis.fireworksInterval = fireworksInterval;
}

function closeCelebration() {
  const screen = document.getElementById("celebrationScreen");
  screen.classList.remove("active");

  // Dừng pháo hoa
  if (globalThis.fireworksInterval) {
    clearInterval(globalThis.fireworksInterval);
  }

  // Xóa tất cả particle còn lại
  document.getElementById("fireworksContainer").innerHTML = "";
}

// ==================== ĐẾM NGƯỢC ====================
function updateCountdown() {
  const now = Date.now();
  const distance = tetDate - now;

  if (distance < 0) {
    // Tết đã đến
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("message").textContent = "Chúc Mừng Năm Mới!";

    // Hiển thị màn hình celebration nếu chưa hiển thị
    if (!celebrationShown) {
      setTimeout(() => {
        showCelebration();
      }, 500);
    }
    return;
  }

  // Tính toán thời gian
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Cập nhật hiển thị
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );

  // Cập nhật thông điệp dựa trên thời gian còn lại
  let message = "";
  if (days === 0 && hours === 0 && minutes === 0) {
    message = "Sắp đến Tết rồi!";
  } else if (days === 0 && hours === 0) {
    message = "Chỉ còn vài phút nữa thôi!";
  } else if (days === 0) {
    message = "Còn vài giờ nữa là Tết!";
  } else if (days === 1) {
    message = "Ngày mai là Tết rồi!";
  } else if (days < 7) {
    message = "Tết đang đến gần!";
  } else if (days < 30) {
    message = "Chuẩn bị đón Tết thôi!";
  } else if (days < 60) {
    message = "Tết sắp đến rồi!";
  } else if (days < 100) {
    message = "Hãy cùng chờ đợi Tết!";
  } else {
    message = `Còn ${days} ngày nữa là đến Tết!`;
  }

  document.getElementById("message").textContent = message;
}

// ==================== KHỞI ĐỘNG ====================
// Cập nhật tiêu đề khi trang load
updateTitles();

// Cập nhật mỗi giây
updateCountdown();
setInterval(updateCountdown, 1000);

// Animation khi load trang
window.addEventListener("load", () => {
  document.querySelectorAll(".fade-in").forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });
});
