import { useEffect, useState } from "react";
import api from "../../../services/api";

// Enum placeholders – defina corretamente conforme estão no seu projeto
enum Sexo {
    MASCULINO = 'masculino',
    FEMININO = 'feminino',
    OUTRO = 'outro',
}

enum EstadoCivil {
    SOLTEIRO = 'solteiro',
    CASADO = 'casado',
    DIVORCIADO = 'divorciado',
    VIUVO = 'viuvo',
}

enum TipoEndereco {
    RESIDENCIAL = 'residencial',
    COMERCIAL = 'comercial',
}

enum TipoAcesso {
    USUARIO = 'usuario',
    ADMIN = 'admin',
}

// Interface alinhada com a entidade User
interface usuario {
    id: number;
    nome: string;
    nome_fantasia: string;
    cpf: string;
    sexo: Sexo;
    estado_civil: EstadoCivil;
    data_nascimento: Date;
    cidade_nascimento: string;
    rg: string;
    cidade_expedicao_rg: string;
    orgao_expedidor: string;
    data_emissao_rg: Date | null;
    documento_exterior: string;
    inscricao_estadual: string;
    pis_pasep: string;
    rntrc: string;
    validade_rntrc: Date;
    email: string;
    telefone: string;
    celular: string;
    operadora: string;
    codigo: string;
    nome_pai: string;
    nome_mae: string;
    ativo: boolean;
    cep: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string; // nullable
    cidade: string;
    tipo_endereco: TipoEndereco;
    latitude: number | null;
    longitude: number | null;
    cargo: string;
    senha: string;
    data_contratacao: Date;
    role: TipoAcesso;
}

export default function ListUsuarios(){
    // Estado para controle de erros
    // guarda mensagens de erro (ou null se não tem erro).
    const [error, setError] = useState<string | null >(null)

    // Estado para armazenar os usuários
    //é a lista dos usuários (vem do banco).
    const [usuarios, setusuarios] = useState<usuario[]>([])

    // Função para buscar os usuários da API, função assíncrona
    const fetchusuarios = async () => {
        try{
            //Faz uma chamada GET /usuarios para o servidor.
           const response =  await api.get("/usuario/list")

           // atualiza o estado com os dados da API
           //Salva a resposta na variável usuarios.
           setusuarios(response.data)

        }catch(error){
            //Se algo der errado, mostra um erro.
            setError("Erro ao carregar os usuários")
        }
    }

    //Executar essa função quando a página carregar
    useEffect(()=> {
        // Busca os dados ao carregar a página
        fetchusuarios()
    },[])// O [] quer dizer que isso acontece só uma vez.

    return (
  <div>
    <h1>Listar os usuários</h1>

    {/* Exibe mensagem de erro */}
    {error && <p style={{ color: "#f00" }}>{error}</p>}

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

}