import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfileAvatar() {
  const { user, changeAvatar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
  // 1. Criamos um estado para controlar as mensagens de erro ou sucesso
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' }); 

  const fileInputRef = useRef(null);

  const handleFileChange = (evento) => {
    const file = evento.target.files[0];
    
    // Limpa qualquer mensagem anterior assim que o usuário escolhe um novo arquivo
    setMensagem({ texto: '', tipo: '' });

    if (!file) return;

    // 2. Trocamos os 'alerts' pelos 'setMensagem'
    if (!file.type.startsWith('image/')) {
      setMensagem({ texto: 'Por favor, selecione apenas arquivos de imagem.', tipo: 'erro' });
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setMensagem({ texto: 'A imagem é muito grande. O limite é 20MB.', tipo: 'erro' });
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = async () => {
      const base64String = reader.result;
      
      const result = await changeAvatar(base64String);
      
      if (!result.success) {
        setMensagem({ texto: 'Erro ao salvar a foto.', tipo: 'erro' });
      } else {
        // Mensagem de sucesso!
        setMensagem({ texto: 'Foto atualizada com sucesso!', tipo: 'sucesso' });
        
        // Faz a mensagem de sucesso sumir sozinha depois de 3 segundos (opcional, mas fica legal)
        setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
      }
      
      setLoading(false);
    };
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      
      <div style={{ marginBottom: '15px' }}>
        <img 
          src={user?.avatar || 'https://via.placeholder.com/100?text=Sem+Foto'} 
          alt="Avatar do utilizador" 
          style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
            border: '3px solid #333' 
          }}
        />
      </div>

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} 
      />

      <button 
        onClick={triggerFileSelect} 
        disabled={loading}
        className="confirm-btn auth-btn" 
        style={{ 
          marginTop: '10px',
          padding: '8px 16px', 
          fontSize: '0.85rem',
          width: 'auto', 
          cursor: loading ? 'wait' : 'pointer'
        }}
      >
        {loading ? 'Salvando foto...' : 'Alterar Foto'}
      </button>

      {/* 3. AQUI É ONDE A MENSAGEM APARECE (Renderiza só se tiver algum texto) */}
      {mensagem.texto && (
        <p style={{ 
          marginTop: '12px', 
          fontSize: '0.85rem', 
          fontWeight: '500',
          // Se for erro, usa vermelho (var(--wrong)), se for sucesso usa verde
          color: mensagem.tipo === 'erro' ? 'var(--wrong)' : '#4CAF50' 
        }}>
          {mensagem.texto}
        </p>
      )}

    </div>
  );
}