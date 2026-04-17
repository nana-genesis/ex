// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Nome de usuário do GitHub que queremos buscar
    const username = 'ogiansouza'; // Substitua pelo seu usuário se quiser
    
    // Elementos da página que serão atualizados
    const avatarEl = document.querySelector('.profile-avatar');
    const nameEl = document.querySelector('.profile-name');
    const usernameEl = document.querySelector('.profile-username');
    const reposEl = document.querySelectorAll('.numbers-item')[0];
    const followersEl = document.querySelectorAll('.numbers-item')[1];
    const followingEl = document.querySelectorAll('.numbers-item')[2];
    const linkEl = document.querySelector('.profile-link');
    
    // Função assíncrona para buscar dados do GitHub
    async function buscarPerfilGitHub() {
        try {
            // Faz a requisição Ajax usando Fetch API
            const response = await fetch(`https://api.github.com/users/${username}`);
            
            // Verifica se a resposta HTTP foi bem sucedida
            if (!response.ok) {
                // Lança exceção com o status do erro
                throw new Error(`Erro HTTP: ${response.status} - Usuário não encontrado`);
            }
            
            // Converte a resposta para JSON
            const dados = await response.json();
            
            // Atualiza os elementos da página com os dados recebidos
            avatarEl.src = dados.avatar_url;
            nameEl.textContent = dados.name || dados.login;
            usernameEl.textContent = `@${dados.login}`;
            
            // Atualiza números (precisa acessar o texto depois do h4)
            reposEl.innerHTML = `<h4>Repositórios</h4> ${dados.public_repos}`;
            followersEl.innerHTML = `<h4>Seguidores</h4> ${dados.followers}`;
            followingEl.innerHTML = `<h4>Seguindo</h4> ${dados.following}`;
            
            linkEl.href = dados.html_url;
            
            console.log('✅ Dados carregados com sucesso via Ajax!');
            
        } catch (erro) {
            // Tratamento da exceção
            console.error('❌ Erro na requisição:', erro.message);
            
            // Feedback visual para o usuário (opcional)
            alert('Não foi possível carregar o perfil do GitHub. Verifique sua conexão.');
            
            // Mantém os dados placeholder em caso de erro
            // ou pode exibir uma mensagem de erro na tela
            nameEl.textContent = 'Erro ao carregar';
            usernameEl.textContent = '@erro';
        }
    }
    
    // Executa a função
    buscarPerfilGitHub();
});