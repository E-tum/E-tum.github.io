document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("otofinder-form");
    const inputText = document.getElementById("input-text");
    const numResults = document.getElementById("num-results");
    const remainingText = document.getElementById("remaining-text");
    const kanaResults = document.getElementById("kana-results");

    // uniqueChars関数
    function uniqueChars(str) {
        return [...new Set(str)].join('');
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // フォーム送信のデフォルト動作を無効にする

        const text = inputText.value.trim();

        if (text) {
            // 音素検出のプログラムを実行する部分
            let sKanaList = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ'];
            let s_txt = text.replace('っ', '');
            s_txt = s_txt.replace(/[^\u3041-\u309F]/g, ''); // ひらがなのみ残す

            let sKanaResult = [];

            // TEXTの文字列の中に、sKanaListの文字が出現したら、TEXTの文字列の一つ前の文字と連結した文字列を配列に格納する
            for (let char of sKanaList) {
                let regex = new RegExp(`(?<=\\w)${char}`, 'g');
                let match;
                while ((match = regex.exec(s_txt)) !== null) {
                    let pos = match.index;
                    if (pos === 0) continue;
                    if (sKanaList.includes(s_txt[pos - 1])) continue;

                    let substr = s_txt[pos - 1] + s_txt[pos];
                    if (!sKanaResult.includes(substr)) {
                        sKanaResult.push(substr);
                    }
                }
            }

            // sKanaResultをソート
            sKanaResult.sort();

            // 検出された部分文字列をs_txtから削除
            for (let char of sKanaResult) {
                s_txt = s_txt.replace(char, '');
            }

            s_txt = uniqueChars(s_txt);
            let s_num = s_txt.length + sKanaResult.length;

            // 結果を表示
            numResults.textContent = `${s_num}音`;
            remainingText.textContent = s_txt;
            kanaResults.textContent = sKanaResult.join('');
        } else {
            numResults.textContent = "0音";
            remainingText.textContent = "入力されたテキストが空です。";
            kanaResults.textContent = "";
        }
    });
});