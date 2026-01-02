import { LogTag } from "./logTag";

export const LogTagIcon: Record<LogTag, string> = {
  [LogTag.APP]: "🚀",
  [LogTag.AUTH]: "🔐",
  [LogTag.UI]: "🎨",
  [LogTag.NAV]: "🧭",
  [LogTag.API]: "🌐",
  [LogTag.SOCKET]: "🔌",
  [LogTag.STORAGE]: "💾",
  [LogTag.PERF]: "⏱️",
  [LogTag.REDUX]: "🧠",
  [LogTag.DB]: "🗄️",
  [LogTag.OTHER]: "📦",
};
