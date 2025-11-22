// src/Components/NewsletterSignup.tsx
function NewsletterSignup() {
    return (
        <section className="bg-blue-600 text-white py-12">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-2xl font-bold mb-4">Fique por dentro das novidades</h2>
                <p className="mb-6 opacity-90">Assine nossa newsletter para receber atualizações sobre projetos importantes e atividades legislativas.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <input type="email" placeholder="Seu e-mail" className="px-6 py-3 rounded-lg text-gray-800 flex-grow max-w-md" />
                    <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all">
                        Assinar <i className="fas fa-paper-plane ml-2"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}
export default NewsletterSignup;