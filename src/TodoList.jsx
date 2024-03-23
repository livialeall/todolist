import React, {useState,useEffect} from "react";
import './TodoList.css';
//import Icone from './assets/icon.png'
function TodoList(){

    /* dentro do Storage ele salva como texto, preciso converter para obejto */
    const listaStorage = localStorage.getItem('Lista'); /* pega o item pela chave lista */

    const [lista,setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []) /* mostrar os itens */
    const [novoItem,setNovoItem] = useState([""])
    /* toda vez que a minha lista mudar de estado eu adiciono uma consequencia */
    useEffect(() => {
        localStorage.setItem('Lista',JSON.stringify(lista))
    },[lista])

    function adicionaItem(form) {
        form.preventDefault();
        if(!novoItem) {
            return
        }
        /* recupera o que eu tenho na lista e acresentar o novo item */
        setLista([...lista,{text: novoItem, isCompleted:false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus()
    }

    function clicou (index) {
        const listaAux = [...lista]
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux) /* novo estado da lista é a listaAux que o item esta cortado */
    }

    function deletou(index) {
        const listaAux = [...lista]
        listaAux.splice(index,1);
        setLista(listaAux); /* novo estado da lista é a listaAux que excluiu o item */
    }

    function deletaTodas(){
        setLista("") /* novo estado da lista é vazia */
    }
        return(
            <div>
                <h1>Lista de Tarefas</h1>
                <form action="" onSubmit={adicionaItem}>
                    <input type="text" 
                    id="input-entrada"
                    placeholder="Adicione aqui sua tarefa" 
                    value={novoItem}
                    onChange={(e)=> {setNovoItem(e.target.value)}} /> {/* eu pego o valor do campo input e mudo o estado o novo item, adiciono na lista novo item */}
                    <button className="add" type="submit">Add</button> 
                </form>
               
                <div className="lista-tarefas">
                    {
                        lista.length < 1 ? 
                        <span className="msg-nenhuma-tarefa">Nenhuma Tarefa Adicionada</span>:
                        lista.map((item,index)=> (
                        <div key={index} className={item.isCompleted ? "item done": "item"}>
                        <span onClick={()=> {clicou(index)}}>{item.text}</span>
                        <button onClick={()=> {deletou(index)}} className="del-button">Deletar</button> 
                        </div>
                        
                        ))                    
                    }    
                    {
                        lista.length > 0 && /* pega o primeiro valor veradeiro - se é verdadeiro ou nao */
                        <button onClick={()=> {deletaTodas()}} className="del-all">Deletar Todas</button>
                    }
                    
                    
                </div>
            </div>
        )
}


export default TodoList