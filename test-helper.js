// ==================== TEST HELPER ====================
// File này giúp test các trường hợp khác nhau của countdown
// CÁCH SỬ DỤNG: Uncomment các test case bên dưới để test

// ==================== CẤU HÌNH TEST ====================
const TEST_MODE = {
  enabled: true, // Bật/tắt chế độ test
  scenario: "BEFORE_TET_3_DAYS", // Chọn kịch bản test
};

// ==================== CÁC KỊCH BẢN TEST ====================
const TEST_SCENARIOS = {
  // Test khi còn hơn 100 ngày
  BEFORE_TET_100_DAYS: {
    description: "Còn 120 ngày đến Tết",
    offsetDays: -120,
  },

  // Test khi còn 60-100 ngày
  BEFORE_TET_80_DAYS: {
    description: "Còn 80 ngày đến Tết",
    offsetDays: -80,
  },

  // Test khi còn 30-60 ngày
  BEFORE_TET_45_DAYS: {
    description: "Còn 45 ngày đến Tết",
    offsetDays: -45,
  },

  // Test khi còn 7-30 ngày
  BEFORE_TET_15_DAYS: {
    description: "Còn 15 ngày đến Tết",
    offsetDays: -15,
  },

  // Test khi còn 1-7 ngày
  BEFORE_TET_3_DAYS: {
    description: "Còn 3 ngày đến Tết",
    offsetDays: -3,
  },

  // Test khi còn đúng 1 ngày
  BEFORE_TET_1_DAY: {
    description: "Ngày mai là Tết",
    offsetDays: -1,
  },

  // Test khi còn vài giờ
  BEFORE_TET_5_HOURS: {
    description: "Còn 5 giờ nữa là Tết",
    offsetHours: -5,
  },

  // Test khi còn vài phút
  BEFORE_TET_30_MINUTES: {
    description: "Còn 30 phút nữa là Tết",
    offsetMinutes: -30,
  },

  // Test khi còn vài giây
  BEFORE_TET_30_SECONDS: {
    description: "Còn 30 giây nữa là Tết",
    offsetSeconds: -30,
  },

  // Test khi đúng Tết (00:00:00)
  TET_TIME: {
    description: "Đúng thời điểm Tết",
    offsetSeconds: 0,
  },

  // Test sau khi Tết đã qua
  AFTER_TET: {
    description: "Tết đã qua 1 ngày",
    offsetDays: 1,
  },
};

// ==================== HÀM TẠO THỜI GIAN TEST ====================
function getTestDate(tetDate, scenario) {
  const testDate = new Date(tetDate);

  if (scenario.offsetDays) {
    testDate.setDate(testDate.getDate() - scenario.offsetDays);
  }

  if (scenario.offsetHours) {
    testDate.setHours(testDate.getHours() - scenario.offsetHours);
  }

  if (scenario.offsetMinutes) {
    testDate.setMinutes(testDate.getMinutes() - scenario.offsetMinutes);
  }

  if (scenario.offsetSeconds) {
    testDate.setSeconds(testDate.getSeconds() - scenario.offsetSeconds);
  }

  return testDate;
}

// ==================== HÀM OVERRIDE Date ====================
// Hàm này sẽ override Date object để trả về thời gian test
function enableTestMode(scenario) {
  if (!TEST_MODE.enabled) return;

  const selectedScenario = TEST_SCENARIOS[scenario];
  if (!selectedScenario) {
    console.error(`Scenario "${scenario}" không tồn tại!`);
    return;
  }

  console.log(`🧪 TEST MODE: ${selectedScenario.description}`);

  // Lưu Date gốc
  const OriginalDate = Date;
  const tetDateOriginal = new Date(TET_INFO.date);
  const testDate = getTestDate(tetDateOriginal, selectedScenario);

  console.log(`📅 Thời gian test: ${testDate.toLocaleString("vi-VN")}`);
  console.log(`🎯 Thời gian Tết: ${tetDateOriginal.toLocaleString("vi-VN")}`);

  // Override Date
  Date = function (...args) {
    if (args.length === 0) {
      return testDate;
    }
    return new OriginalDate(...args);
  };

  Date.now = function () {
    return testDate.getTime();
  };

  Date.prototype = OriginalDate.prototype;

  // Copy static methods
  Object.setPrototypeOf(Date, OriginalDate);
}

// ==================== CÁCH SỬ DỤNG ====================
/*

BẬT CHỂ ĐỘ TEST:
1. Mở file này (test-helper.js)
2. Thay đổi TEST_MODE.enabled = true
3. Chọn scenario muốn test trong TEST_MODE.scenario
4. Load lại trang

VÍ DỤ:

const TEST_MODE = {
  enabled: true,                    // Bật test mode
  scenario: "BEFORE_TET_3_DAYS",   // Chọn scenario
};

DANH SÁCH SCENARIOS:
- BEFORE_TET_100_DAYS    : Còn 120 ngày
- BEFORE_TET_80_DAYS     : Còn 80 ngày
- BEFORE_TET_45_DAYS     : Còn 45 ngày
- BEFORE_TET_15_DAYS     : Còn 15 ngày
- BEFORE_TET_3_DAYS      : Còn 3 ngày
- BEFORE_TET_1_DAY       : Còn 1 ngày
- BEFORE_TET_5_HOURS     : Còn 5 giờ
- BEFORE_TET_30_MINUTES  : Còn 30 phút
- BEFORE_TET_30_SECONDS  : Còn 30 giây
- TET_TIME               : Đúng lúc Tết
- AFTER_TET              : Sau Tết 1 ngày

*/

// ==================== KHỞI ĐỘNG TEST MODE ====================
// Hàm này sẽ được gọi từ main.js
function initTestMode() {
  if (TEST_MODE.enabled) {
    enableTestMode(TEST_MODE.scenario);
  }
}

// Export để sử dụng trong main.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initTestMode, TEST_MODE };
}
