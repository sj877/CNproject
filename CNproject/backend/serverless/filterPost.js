const BAD_WORDS = [
  "시발","씨발","병신","개새끼","좆",
  "fuck","shit","bitch","asshole"
];

function sanitizeText(text) {
  if (!text) return "";
  let result = text;
  BAD_WORDS.forEach((word) => {
    const regex = new RegExp(word, "gi");
    if (regex.test(result)) {
      const stars = "*".repeat(word.length);
      result = result.replace(regex, stars);
    }
  });
  return result;
}

function filterPost(title, content) {
  const sanitizedTitle = sanitizeText(title || "");
  const sanitizedContent = sanitizeText(content || "");

  const hasBadWord =
    sanitizedTitle !== (title || "") ||
    sanitizedContent !== (content || "");

  if (hasBadWord) {
    return {
      allowed: false,
      sanitizedTitle,
      sanitizedContent,
      reason: "욕설이 포함된 게시글입니다."
    };
  }

  return {
    allowed: true,
    sanitizedTitle,
    sanitizedContent,
    reason: "정상 게시글입니다."
  };
}

module.exports = { filterPost };
