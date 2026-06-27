import {useState} from 'react';


const Ajuda = () => {
    const [mostrarAjuda, setMostrarAjuda] = useState(false);


    return (
        <div>
            <button onClick={() => setMostrarAjuda(prev => !prev)}>Ajuda</button>
            {mostrarAjuda && (
                <p>Dica: Preencha todos os campos corretamente!</p>
            )}
        </div>
    );
};

export default Ajuda;