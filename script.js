// Esperem que tot el contingut HTML estigui carregat
document.addEventListener('DOMContentLoaded', () => {
    console.log("Archivo de Animales Extintos cargado correctamente.");

    // --- 1. EFECTE VISUAL I LOG DE NAVEGACIÓ ---
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Mostra a la consola a quin animal estem anant
            console.log("Navegando a: " + e.target.innerText);
        });
    });

    // --- 2. LÒGICA DE PUBLICAR COMENTARIS ---
    const publishBtn = document.getElementById('publish-btn');
    const commentInput = document.getElementById('comment-text');
    const commentsList = document.getElementById('comments-list');

    // Només executem si el botó de publicar existeix a la pàgina
    if (publishBtn) {
        publishBtn.addEventListener('click', () => {
            const text = commentInput.value.trim();

            if (text !== "") {
                // Creem el nou bloc de comentari
                const newComment = document.createElement('div');
                newComment.classList.add('comment-box');
                
                // Li posem el disseny que hem definit al CSS
                newComment.innerHTML = `
                    <span class="user-name">Crononauta Anònim 🛡️</span>
                    <p>"${text}"</p>
                `;

                // El posem al principi de la llista (prepend)
                commentsList.prepend(newComment);

                // Netejem la caixa de text i enviem confirmació a la consola
                commentInput.value = "";
                console.log("Comentario publicado por el usuario.");
            } else {
                alert("El buit no és un comentari vàlid per a l'Archivum!");
            }
        });
    }

    // --- 3. LOG DE L'EXAMEN (OPCIONAL) ---
    const quizForm = document.querySelector('.quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la pàgina es recarregui
            alert("Respostes enviades al passat! Revisa la consola.");
            console.log("Qüestionari completat.");
        });
    }
});
function checkQuiz() {
    const correctAnswers = { q1: "B", q2: "B", q3: "B", q4: "C", q5: "C", q6: "B" };
    let score = 0;
    const totalQuestions = 6;
    
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('quiz-result');
    const gifImg = document.getElementById('quiz-gif');

    // 1. Calculem la nota amb seguretat
    for (let i = 1; i <= totalQuestions; i++) {
        // Busquem l'opció marcada per a la pregunta actual
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        
        // Si hi ha alguna cosa marcada i coincideix amb la correcta, sumem
        if (selected && selected.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    // 2. Preparem el GIF
    gifImg.style.display = "block";
    gifImg.style.margin = "20px auto";
    gifImg.style.maxWidth = "250px"; // Perquè no surti gegant

    // 3. Mostrem missatge i GIF segons la nota
    if (score === totalQuestions) {
        resultDiv.innerHTML = `🏆 NOTA: ${score}/${totalQuestions} - Ets un mestre!`;
        resultDiv.style.color = "#00ff00";
        gifImg.src = "Imagenes/trex.gif"; 
    } else if (score >= 3) {
    resultDiv.innerHTML = `🔍 NOTA: ${score}/${totalQuestions} - Gairebé ho tens!`;
    resultDiv.style.color = "#ff8c00";
    gifImg.src = "Imagenes/velociraptor.gif";
} else {
        resultDiv.innerHTML = `💀 NOTA: ${score}/${totalQuestions} - Has acabat extint!`;
        resultDiv.style.color = "#ff4444";
        // HA D'ANAR AQUÍ DINS:
        gifImg.src = "Imagenes/ahahah.gif";
    }

    // 4. Fem scroll automàtic fins al resultat perquè l'usuari el vegi de seguida
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}