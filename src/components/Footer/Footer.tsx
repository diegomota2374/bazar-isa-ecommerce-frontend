import SocialLinks from "../SocialLinks/SocialLinks";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-900  py-2">
      <div className="border-t-2 border-gray-400 py-3 mt-2"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="flex justify-end ">
            <SocialLinks />
          </div>
          {/* Seção Sobre */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Sobre Nós
            </h2>
            <p className="text-gray-600">
              Somos uma plataforma dedicada à venda de roupas usadas. Nosso
              objetivo é promover a moda sustentável, oferecendo peças de
              qualidade a preços acessíveis.
            </p>
          </div>

          {/* Informações de Contato */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Contato
            </h2>
            <p className="text-gray-600">
              Endereço: Rua José Carlos S. Gomes, 45, Segunda Etapa
            </p>
            <p className="text-gray-600">Telefone: +55 (85) 99637-0976</p>
            <p className="text-gray-600">Email: diegomota2374@gmail.com</p>
          </div>
        </div>

        {/* Divisão */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} Bazar Isa. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
