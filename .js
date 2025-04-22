document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('latexInput');
    const output = document.getElementById('latexOutput');

    input.addEventListener('input', () => {
        const text = input.value;
        const convertedHTML = convertLaTeXToHTML(text);
        output.innerHTML = convertedHTML;
    });

    // Initial render
    output.innerHTML = convertLaTeXToHTML(input.value);
});

function convertCalculus(text) {
    // Integral with limits \int_{a}^{b}
    text = text.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, 
        '<span class="integral">∫</span><sub class="limit">$1</sub><sup class="limit">$2</sup>');
    
    // Sum with limits \sum_{n=1}^{\infty}
    text = text.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, 
        '<span class="sum">∑</span><sub class="limit">$1</sub><sup class="limit">$2</sup>');
    
    return text;
}

function convertLaTeXToHTML(latex) {
    let html = latex;
    html = convertCalculus(html);
    html = convertFractions(html);
    html = convertSuperscripts(html);
    html = convertSubscripts(html);
    html = convertSymbols(html);
    return html;
}

function convertFractions(text) {
    return text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, 
        '<span class="frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>');
}

function convertSuperscripts(text) {
    return text.replace(/\^\{([^}]+)\}/g, '<sup class="sup">$1</sup>')
               .replace(/\^([\w\d]+)/g, '<sup class="sup">$1</sup>');
}

function convertSubscripts(text) {
    return text.replace(/_\{([^}]+)\}/g, '<sub class="sub">$1</sub>')
               .replace(/_([\w\d]+)/g, '<sub class="sub">$1</sub>');
}

function convertSymbols(text) {
    text = text.replace(/\\cdot/g, '⋅');
    text = text.replace(/\\times/g, '×');
    text = text.replace(/\\div/g, '÷');

    text = text.replace(/\\Rightarrow/g, '⇒');
    text = text.replace(/\\rightarrow/g, '→');
    text = text.replace(/\\Leftrightarrow/g, '⇔');
    
    text = text.replace(/\\int/g, '∫');
    text = text.replace(/\\sum/g, '∑');
    text = text.replace(/\\partial/g, '∂');
    text = text.replace(/\\infty/g, '∞');
    
    text = text.replace(/\\alpha/g, 'α');
    text = text.replace(/\\beta/g, 'β');
    text = text.replace(/\\gamma/g, 'γ');
    text = text.replace(/\\Delta/g, 'Δ');
    
    text = text.replace(/\\langle/g, '⟨');
    text = text.replace(/\\rangle/g, '⟩');
    
    return text;
}
