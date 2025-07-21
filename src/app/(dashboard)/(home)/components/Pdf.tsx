import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

/**
 * Dados vindos do front (treatedData)
 */
export interface TreatedData {
  clientId: string | null;
  projectId: string | null;
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  architectureProject: boolean;
  socialMediaContent: boolean;
  complementarProjects: boolean;
  area: string;
  flooring: string;
  capacity: string;
}

/**
 * Props finais do contrato
 */
export interface PalhetaContractProps {
  contratadaRazaoSocial?: string;
  contratadaCnpj?: string;
  contratadaEndereco?: string;

  contratanteNome: string;
  contratanteCpfCnpj: string;
  contratanteEndereco: string;
  contratanteTelefone?: string;
  contratanteEmail: string;

  area: string;
  capacidade: string;
  pavimentos: string;
  pacote1: boolean;
  pacote2: boolean;
  pacote3: boolean;

  valorTotal?: number;
  formasPagamento?: string;
  prazoExecucao?: string;

  responsavel?: string;
  telefoneResponsavel?: string;
  dataEmissao?: Date;
}

/**
 * Conversor treatedData → PalhetaContractProps
 */
export const mapTreatedData = (
  td: TreatedData,
  extras: Partial<Omit<PalhetaContractProps, keyof TreatedData>> = {}
): PalhetaContractProps => ({
  contratadaRazaoSocial: "EDI CARLOS AMADOR PALHETA LTDA",
  contratadaCnpj: "52.541.951/0001-71",
  contratadaEndereco: "AV. PAULISTA, 1106, SÃO PAULO - SP",

  contratanteNome: td.name,
  contratanteCpfCnpj: td.cpfCnpj,
  contratanteEndereco: `${td.address}, ${td.number} – ${td.neighborhood}, ${td.city}-${td.state}, CEP ${td.postalCode}`,
  contratanteTelefone: extras.contratanteTelefone ?? "",
  contratanteEmail: td.email,

  area: td.area,
  capacidade: td.capacity,
  pavimentos: td.flooring,

  pacote1: td.architectureProject,
  pacote2: td.socialMediaContent,
  pacote3: td.complementarProjects,

  valorTotal: extras.valorTotal ?? 0,
  formasPagamento: extras.formasPagamento ?? "A definir",
  prazoExecucao: extras.prazoExecucao ?? "50 (cinquenta) dias corridos",
  responsavel: extras.responsavel ?? "Consultor",
  telefoneResponsavel: extras.telefoneResponsavel ?? "(11) 90000‑0000",
  dataEmissao: extras.dataEmissao ?? new Date(),
});

// ------------------------------ STYLES ------------------------------------
const colors = { primary: "#0d123c", text: "#000000" };

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    position: "relative",
    flex: 1,
    flexGrow: 1,
    fontFamily: "Helvetica",
    color: colors.text,
    flexDirection: "column",
    height: "100vh",
    lineHeight: 1.35,
  },
  pageView: {
    flex: 1,
    flexDirection: "column",
    padding: 35,
    paddingVertical: 100,
  },
  fullBg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  section: { marginTop: 12, flexDirection: "column" },
  h1: {
    color: colors.primary,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginBottom: 4,
  },
  p: { fontSize: 10, textAlign: "justify" },
  bulletRow: { flexDirection: "row", marginTop: 4 },
  bulletDot: { fontFamily: "Helvetica-Bold", marginRight: 4 },
  small: { fontSize: 6, marginTop: 30, textAlign: "justify" },
  label: { fontFamily: "Helvetica-Bold", color: colors.primary },
  footerPage: {
    position: "absolute",
    fontSize: 8,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: colors.primary,
  },
});

// --------------------------- HELPERS --------------------------------------
const Bullet = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bulletDot}>•</Text>
    <Text style={styles.p}>{children}</Text>
  </View>
);

const Numbered = ({
  n,
  children,
}: {
  n: number | string;
  children: React.ReactNode;
}) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bulletDot}>{n}. </Text>
    <Text style={styles.p}>{children}</Text>
  </View>
);

// ---------------------- COMPONENTE PRINCIPAL -----------------------------
export const PalhetaContract = (props: PalhetaContractProps) => {
  const {
    contratadaRazaoSocial,
    contratadaCnpj,
    contratadaEndereco,
    contratanteNome,
    contratanteCpfCnpj,
    contratanteEndereco,
    contratanteTelefone = "",
    contratanteEmail,
    area,
    capacidade,
    pavimentos,
    pacote1,
    pacote2,
    pacote3,
    valorTotal = 0,
    formasPagamento = "A definir",
    prazoExecucao = "50 (cinquenta) dias corridos",
    responsavel = "Consultor",
    telefoneResponsavel = "(11) 90000‑0000",
    dataEmissao = new Date(),
  } = props;

  return (
    <Document>
      {/* ------------------------- PÁGINA 1 ---------------------------- */}
      <Page size="A4" style={styles.page} wrap>
        <Image src="/images/image4.jpg" style={styles.fullBg} fixed />
        <View style={styles.pageView}>
          <View style={styles.section}>
            <Text style={styles.label}>CONTRATADA:</Text>
            <Text style={styles.p}>
              {contratadaRazaoSocial}, CNPJ {contratadaCnpj},{" "}
              {contratadaEndereco}, simplesmente doravante denominada
              CONTRATADA.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>CONTRATANTE:</Text>
            <Text style={styles.p}>NOME/RAZÃO SOCIAL: {contratanteNome}</Text>
            <Text style={styles.p}>CPF/CNPJ: {contratanteCpfCnpj}</Text>
            <Text style={styles.p}>ENDEREÇO: {contratanteEndereco}</Text>
            {contratanteTelefone && (
              <Text style={styles.p}>TELEFONE: {contratanteTelefone}</Text>
            )}
            <Text style={styles.p}>E‑MAIL: {contratanteEmail}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.p}>
              As partes acima obrigações celebram o presente Contrato de Adesão
              para prestação de serviços, conforme as condições abaixo
              descritas, regido pela boa‑fé e pelo Código de Defesa do
              Consumidor (Lei nº 8.078/1990).
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>1. OBJETO DO CONTRATO</Text>
            <Text style={styles.p}>
              O presente contrato tem como objeto a prestação de serviços de
              PROJETO DE ARQUITETURA, abrangendo:
            </Text>
            {pacote1 && <Bullet>PACOTE 01 – PROJETO ARQUITETÔNICO</Bullet>}
            {pacote2 && (
              <Bullet>
                PACOTE 02 – VISUALIZAÇÃO 3D E MÍDIAS PARA REDES SOCIAIS
              </Bullet>
            )}
            {pacote3 && <Bullet>PACOTE 03 – SERVIÇOS COMPLEMENTARES</Bullet>}
            <Bullet>
              ÁREA: {area} | CAPACIDADE: {capacidade} | PAVIMENTOS: {pavimentos}
            </Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>2. DESENVOLVIMENTO DO PROJETO</Text>
            <Bullet>Formulário de briefing preenchido pela CONTRATANTE.</Bullet>
            <Bullet>Reunião gravada via Meet.</Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>3. OBRIGAÇÕES DAS PARTES</Text>
            <Text style={[styles.label, { marginTop: 4 }]}>CONTRATADA:</Text>
            <Bullet>Prestar os serviços conforme prazos e condições.</Bullet>
            <Bullet>Disponibilizar arquivos finais em PDF, JPEG e MP4.</Bullet>
            <Bullet>Oferecer até 3 revisões gratuitas.</Bullet>
            <Text style={[styles.label, { marginTop: 8 }]}>CONTRATANTE:</Text>
            <Bullet>Disponibilizar informações em até 10 dias corridos.</Bullet>
            <Bullet>Efetuar pagamentos conforme item 4.</Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>4. FORMA E PRAZO DE PAGAMENTO</Text>
            <Numbered n="4.1">
              Valor total do serviço:{" "}
              {valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              . Parcelamento: {formasPagamento}
            </Numbered>
            <Numbered n="4.2">
              Custos adicionais (taxas, RRT, etc.) serão cobrados à parte.
            </Numbered>
            <Numbered n="4.3">O não pagamento implicará:</Numbered>
            <Bullet>Multa de 2% sobre o valor devido.</Bullet>
            <Bullet>Juros de 1% ao mês.</Bullet>
            <Bullet>Suspensão dos serviços.</Bullet>
          </View>

          <Text
            style={styles.footerPage}
            render={({ pageNumber }) => `${pageNumber}`}
            fixed
          ></Text>
        </View>
      </Page>

      {/* ------------------------- PÁGINA 2 ---------------------------- */}
      <Page size="A4" style={styles.page} wrap>
        <Image src="/images/image4.jpg" style={styles.fullBg} fixed />
        <View style={styles.pageView}>
          <View style={styles.section}>
            <Text style={styles.h1}>5. ALTERAÇÕES E CANCELAMENTOS</Text>
            <Numbered n="5.1">
              Alterações após entrega: 10% do valor do contrato.
            </Numbered>
            <Numbered n="5.2">Cancelamento pelo CONTRATANTE:</Numbered>
            <Bullet>Custos já incorridos pela CONTRATADA.</Bullet>
            <Bullet>Multa de 10% do contrato.</Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>6. PRAZO DE EXECUÇÃO</Text>
            <Numbered n="6.1">Entrega em até {prazoExecucao}.</Numbered>
            <Numbered n="6.2">
              Suspensão superior a 3 meses = rescisão (item 5.2).
            </Numbered>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>7. DIREITOS AUTORAIS E USO DO PROJETO</Text>
            <Bullet>
              Projeto protegido pela legislação de direitos autorais.
            </Bullet>
            <Bullet>
              Uso exclusivo para execução da obra. Reprodução ou alteração
              proibida sem autorização prévia.
            </Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>8. ACEITE E ADESÃO</Text>
            <Bullet>Assinatura do CONTRATANTE.</Bullet>
            <Bullet>Pagamento inicial ou uso dos serviços.</Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>9. ENTREGA DOS ARQUIVOS</Text>
            <Bullet>Formatos fornecidos sem custos: PDF, JPEG e MP4.</Bullet>
            <Bullet>
              Arquivos .DWG poderão ser disponibilizados mediante pagamento
              adicional de 5% do valor total do contrato.
            </Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>10. FORO</Text>
            <Text style={styles.p}>
              Fica eleito o Foro da Comarca de São Paulo‑SP para dirimir
              quaisquer dúvidas oriundas deste contrato.
            </Text>
          </View>

          <View style={[styles.section, { marginTop: 24 }]}>
            <Text style={styles.p}>{contratadaRazaoSocial}</Text>
            <Text style={styles.p}>{"".padEnd(60, "_")} CONTRATANTE</Text>
          </View>

          <View style={[styles.section, { marginTop: 24 }]}>
            <Text style={{ color: "#0d123c" }}>Atenciosamente,</Text>
            <Text
              style={{
                color: "#0d123c",
                fontFamily: "Helvetica-Bold",
                marginTop: 8,
              }}
            >
              {responsavel?.toUpperCase()}
            </Text>
            <Text style={{ color: "#0d123c", marginTop: 4 }}>Consultor</Text>
            <Text style={{ color: "#0d123c", marginTop: 4 }}>
              {telefoneResponsavel}
            </Text>
            <Text style={{ marginTop: 12 }}>
              Data: {dataEmissao.toLocaleDateString("pt-BR")}
            </Text>
          </View>

          <Text
            style={styles.footerPage}
            render={({ pageNumber }) => `${pageNumber}`}
            fixed
          ></Text>
        </View>
      </Page>
    </Document>
  );
};
