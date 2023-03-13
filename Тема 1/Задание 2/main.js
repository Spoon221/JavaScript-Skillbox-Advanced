(() => {
    function firstToUpper(input, splitter) {
        let words = [];
        for (const s of input.value.split(splitter)) {
            words.push(s.charAt(0).toUpperCase() + s.slice(1));
        }
        return words.join(splitter);
    }

    function replaceRepeating(input, repeated) {
        let previous = '';
        let result = '';
        for (let s of input.value) {
            if (s != previous != repeated)
                result += s;
            previous = s;
        }

        return result;
    }

    const allowedKeys = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя- ';
    document.addEventListener('DOMContentLoaded', () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('keypress', event => {
                event.preventDefault();
                if (allowedKeys.includes(event.key.toLowerCase()))
                    input.value += event.key;
            });

            input.addEventListener('blur', () => {
                input.value = input.value.trim();
                let result = '';
                for (const s of input.value) {
                    if (allowedKeys.includes(s))
                        result += s;
                };
                input.value = result;
                input.value = input.value.replace(/^-+/, '').replace(/a+$/, '');
                input.value = firstToUpper(input, ' ');
                input.value = firstToUpper(input, '-');
                input.value = replaceRepeating(input ,' ');
                input.value = replaceRepeating(input, '-')
            });
        });

        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const paragraphs = document.getElementById('paragraphs');
            const paragraph = document.createElement('p');
            const inputs = document.querySelectorAll('input');
            const text = [];
            inputs.forEach(input => text.push(input.value));
            paragraph.textContent = text.join(' ');
            paragraphs.append(paragraph);
            document.body.append(paragraphs);
            form.reset();
        })
    })
})()