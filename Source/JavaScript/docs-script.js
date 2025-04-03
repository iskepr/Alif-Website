// عرض المستندات
let heads = document.querySelector(".heads");
let docsDiv = document.querySelector(".docs");
let CatDiv = document.querySelector("#Catalogue");
let GramDiv = document.getElementById("Grammar");
let headingsDiv = document.querySelector(".headings");
// عرض  المستندات
function showDocs(docType) {
  if (docType == "إرشادات استعمال ألف") {
    fetch(
      "https://raw.githubusercontent.com/Shad7ows/Alif/refs/heads/Alif5.0/documents/إرشادات إستعمال ألف.md"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("الملف غير موجود");
        }
        return res.text();
      })
      .then((markdown) => {
        GramDiv.style.display = "none";
        // document.querySelector("#Catalogue").innerHTML = marked.parse(markdown);
        // إضافة أرقام الأسطر
        // document.querySelectorAll("pre").forEach((pre) => {
        //   let numsDiv = document.createElement("div");
        //   numsDiv.className = "nums";
        //   pre.insertBefore(numsDiv, pre.firstChild);
        // });
        // function countLines(codeDiv) {
        //   let tempDiv = document.createElement("div");
        //   tempDiv.innerHTML = codeDiv.innerHTML;
        //   tempDiv.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
        //   return tempDiv.innerText.split("\n").length - 1;
        // }
        // function addNumLines(codeDiv, numsDiv) {
        //   let lines = countLines(codeDiv);
        //   numsDiv.innerHTML = Array.from(
        //     { length: lines },
        //     (_, i) => `<p>${i + 1}</p>`
        //   ).join("");
        // }
        // function syncScroll(codeDiv, numsDiv) {
        //   numsDiv.scrollTop = codeDiv.scrollTop;
        // }
        // document.querySelectorAll("pre").forEach((ide) => {
        //   let codeDiv = ide.querySelector("code");
        //   let numsDiv = ide.querySelector(".nums");
        //   if (codeDiv && numsDiv) {
        //     codeDiv.addEventListener("input", () =>
        //       addNumLines(codeDiv, numsDiv)
        //     );
        //     codeDiv.addEventListener("scroll", () =>
        //       syncScroll(codeDiv, numsDiv)
        //     );
        //     addNumLines(codeDiv, numsDiv);
        //   }
        // });

        // نسخ الشفرة
        document.querySelectorAll("code").forEach((block) => {
          // block.innerHTML = highlightAlif(block.innerHTML);
          let copyButton = document.createElement("div");
          copyButton.className = "copy";
          copyButton.innerText = "نسخ";
          copyButton.onclick = function () {
            copyCode(this, block.innerHTML);
          };
          block.appendChild(copyButton);
        });

        // استخراج كل العناوين
        let headings = document.querySelectorAll(".docs h5");
        let head = Array.from(headings).map((h5) => {
          let cleanedText = h5.innerText
            .replace(/"/g, "")
            .replace(/[:]/g, "")
            .trim();
          return cleanedText;
        });
        head.forEach((text, i) => {
          let id = text.replace(/\s+/g, "-");
          heads.innerHTML += `<a href="#${id}" class="section-link" data-id="${id}"><h3 dir="rtl">- ${text}</h3></a>`;
        });

        // جعل العرض في الوسط
        document.querySelectorAll(".section-link").forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();
            const id = link.getAttribute("data-id");
            const section = document.getElementById(id);
            const topPosition = section.offsetTop - 80;
            window.scrollTo({ top: topPosition, behavior: "smooth" });
          });
        });

        // استخراج كل li
        let titles = document.querySelectorAll(".docs li");

        // تغيير لون العنوان حسب القسم الذي يتم التمرير إليه
        window.addEventListener("scroll", () => {
          let currentSection = "";
          titles.forEach((section) => {
            if (pageYOffset >= section.offsetTop - 100) {
              currentSection = section.getAttribute("id");
            }
          });
          document.querySelectorAll(".heads .section-link").forEach((link) => {
            link.style.color = "#fff";
            if (link.getAttribute("href").includes(currentSection)) {
              link.style.color = "var(--bur--)";
            }
            if (!currentSection || currentSection.trim() === "") {
              link.style.color = "#fff";
            }
          });
        });
        titles.forEach((li) => {
          let h5 = li.querySelector("h5");
          li.setAttribute("data-aos", "fade-up");
          if (h5) {
            let cleanedText = h5.innerText
              .replace(/"/g, "")
              .replace(/[:]/g, "")
              .trim();
            let id = cleanedText.replace(/\s+/g, "-");
            li.setAttribute("id", id);
          }
        });

        // فتح أو إغلاق العناوين عند النقر على الزر
        const openHeadsButton = document.getElementById("openheads");
        const headingss = document.querySelector(".headings");
        let isheadingsVisible = false;
        openHeadsButton.addEventListener("click", (event) => {
          event.stopPropagation();
          if (isheadingsVisible) {
            headingss.style.transform = "translateX(300px)";
            docsDiv.style.opacity = 1;
          } else {
            headingss.style.transform = "translateX(0)";
            docsDiv.style.opacity = 0.5;
          }
          isheadingsVisible = !isheadingsVisible;
        });
        document.addEventListener("click", () => {
          if (isheadingsVisible) {
            headingss.style.transform = "translateX(300px)";
            docsDiv.style.opacity = 1;
            isheadingsVisible = false;
          }
        });
        headingss.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      });
  } else if (docType == "قواعد مطابق ألف") {
    fetch(
      "https://raw.githubusercontent.com/Shad7ows/Alif/refs/heads/Alif5.0/documents/قواعد مطابق ألف.md"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("الملف غير موجود");
        }
        return res.text();
      })
      .then((markdown) => {
        GramDiv.innerHTML = marked.parse(markdown);
        GramDiv.style.display = "block";
        CatDiv.style.display = "none";
        headingsDiv.style.display = "none";
      })
      .then(() => {
        GramDiv.innerHTML = highlightAlifGrammar(GramDiv.innerHTML);
      });
  }
}
showDocs("إرشادات استعمال ألف");

// تلوين الشفرة
function highlightAlif(code) {
  let stringPattern = /م?"[^"]*"|'[^']*'/g;
  let formattedStringPattern = /"([^"]*?)\{(.*?)\}([^"]*?)"/g;
  let stringMatches = [];

  let commentPattern = /(?:#.*$)/gm;
  let comments = [];
  let sanitizedCode = code.replace(commentPattern, (match, offset) => {
    comments.push({
      index: offset,
      length: match.length,
      replacement: `<span class="comment">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });
  let explainPattern = /(?:!!.*$)/gm;
  let explains = [];
  sanitizedCode = code.replace(explainPattern, (match, offset) => {
    explains.push({
      index: offset,
      length: match.length,
      replacement: `<span class="explain">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  sanitizedCode = sanitizedCode.replace(
    formattedStringPattern,
    (match, before, expr, after, offset) => {
      let formattedReplacement = `<span class="string">"${before}</span>{${expr}}<span class="string">"${after}"</span>`;
      stringMatches.push({
        index: offset,
        length: match.length,
        replacement: formattedReplacement,
      });
      return "☀".repeat(match.length);
    }
  );

  sanitizedCode = sanitizedCode.replace(stringPattern, (match, offset) => {
    stringMatches.push({
      index: offset,
      length: match.length,
      replacement: `<span class="string">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  let patterns = [
    { txt: /\b\d+(\.\d+)?\b/g, className: "number" },
    { txt: /(صح|خطأ|خطا)(\)|]|\s)+/g, className: "boolean" },
    {
      txt: /(?<!\w)(دالة|اذا|استورد|ارجع|بينما|لاجل|استمر|توقف|احذف|اواذا|والا|صنف|الزمن|الرياضيات|نوع)(?!\w)/g,
      className: "keyword",
    },
    {
      txt: /(\+=|-=|\*=|\/=|\^=|==|!=|<|>|\+|- |\||\*|\\|\^|=| و | او | ليس )/g,
      className: "operator",
    },
    {
      txt: /([ء-يA-Za-z_][ء-يA-Za-z0-9_]*)\s*(?=\()/g,
      className: "function",
    },
  ];

  let matches = [];
  patterns.forEach(({ txt, className }) => {
    let match;
    while ((match = txt.exec(sanitizedCode)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        replacement: `<span class="${className}">${match[0]}</span>`,
      });
    }
  });

  matches = matches.concat(stringMatches).concat(comments).concat(explains);
  matches.sort((a, b) => a.index - b.index);

  let highlightedCode = "";
  let lastIndex = 0;
  matches.forEach(({ index, length, replacement }) => {
    highlightedCode += sanitizedCode.substring(lastIndex, index) + replacement;
    lastIndex = index + length;
  });
  highlightedCode += sanitizedCode.substring(lastIndex);

  return highlightedCode.replace(/\n/g, "<br>");
}

// تلوين قواعد مطابقة  ألف
function highlightAlifGrammar(code) {
  let commentPattern = /(?:#.*$)/gm;
  let comments = [];
  let sanitizedCode = code.replace(commentPattern, (match, offset) => {
    comments.push({
      index: offset,
      length: match.length,
      replacement: `<span class="comment">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  let explainPattern = /(?:!!.*$)/gm;
  let explains = [];
  sanitizedCode = sanitizedCode.replace(explainPattern, (match, offset) => {
    explains.push({
      index: offset,
      length: match.length,
      replacement: `<span class="explain">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  let anchorTagPattern = /<a\b[^>]*>(.*?)<\/a>/g;
  let anchorMatches = [];
  sanitizedCode = sanitizedCode.replace(anchorTagPattern, (match, p1, offset) => {
    anchorMatches.push({
      index: offset,
      length: match.length,
      replacement: match,
    });
    return "☀".repeat(match.length);
  });

  let stringPattern = /م?"[^"]*"|'[^']*'/g;
  let stringMatches = [];
  sanitizedCode = sanitizedCode.replace(stringPattern, (match, offset) => {
    stringMatches.push({
      index: offset,
      length: match.length,
      replacement: `<span class="string">${match}</span>`,
    });
    return "☀".repeat(match.length);
  });

  let patterns = [
    { txt: /\b\d+(\.\d+)?\b/g, className: "number" },
    { txt: /\s+(صح|خطأ|خطا)(\)|]|\s)+/g, className: "boolean" },
    {
      txt: /\s+(?<!\w)(دالة|اذا|إذا|استورد|ارجع|بينما|لاجل|استمر|توقف|احذف|اواذا|والا|صنف|الزمن|الرياضيات|نوع)(?!\w)/g,
      className: "keyword",
    },
    {
      txt: /(\+=|-=|\*=|\/=|\^=|==|!=|\+|- |\||\*|\\|\^|=| و | او | ليس )/g,
      className: "operator",
    },
    {
      txt: /([ء-يA-Za-z_][ء-يA-Za-z0-9_]*)\s*(?=\()/g,
      className: "function",
    },
  ];

  let matches = [];
  patterns.forEach(({ txt, className }) => {
    let match;
    while ((match = txt.exec(sanitizedCode)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        replacement: `<span class="${className}">${match[0]}</span>`,
      });
    }
  });

  matches = matches.concat(stringMatches).concat(comments).concat(explains).concat(anchorMatches);
  matches.sort((a, b) => a.index - b.index);

  let highlightedCode = "";
  let lastIndex = 0;
  matches.forEach(({ index, length, replacement }) => {
    highlightedCode += sanitizedCode.substring(lastIndex, index) + replacement;
    lastIndex = index + length;
  });
  highlightedCode += sanitizedCode.substring(lastIndex);

  return highlightedCode.replace(/\n/g, "<br>");
}
// نسخ الشفرة
function copyCode(but, code) {
  let formattedCode = code
    .replace(/  /g, "")
    .replace(/&gt; /g, "")
    .replace(/&lt; /g, "")
    .replace(/<br>/g, "\n")
    .replace(/<\/span>/g, "")
    .replace(/<span class="[^"]+">/g, "")
    .replace(/<div class="copy">نسخ<\/div>/g, "");

  navigator.clipboard.writeText(formattedCode);
  but.innerHTML = "نُسِخ";
  setTimeout(function () {
    but.innerHTML = "نسخ";
  }, 3000);
}
