import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

/**
 * Dados vindos do front (treatedData)
 */
export interface TreatedData {
  clientId: string | null;
  proposalId: string | null;
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
  signatureUrl?: string;
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
  signatureUrl?: string;
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
  telefoneResponsavel: extras.telefoneResponsavel ?? "(11) 90000-0000",
  dataEmissao: extras.dataEmissao ?? new Date(),
  signatureUrl:
    "signatureUrl" in extras
      ? (extras.signatureUrl as string | undefined)
      : (td.signatureUrl as string | undefined),
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
    lineHeight: 1,
  },
  pageView: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    paddingVertical: 80,
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
  assinaturaWrap: { marginTop: 12, width: 200, height: 60 },
  assinaturaImg: { width: 200, height: 60, objectFit: "contain" },
  assinaturaLinha: { fontSize: 10, marginTop: 20, marginBottom: 10 },
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
    telefoneResponsavel = "(11) 90000-0000",
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
            <Text style={styles.p}>E-MAIL: {contratanteEmail}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.p}>
              As partes acima identificadas celebram o presente Contrato de
              Adesão para prestação de serviços, conforme as condições abaixo
              descritas, regido pela boa-fé e pelo Código de Defesa do
              Consumidor (Lei nº 8.078/1990).
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>1. OBJETO DO CONTRATO</Text>
            <Text style={styles.p}>
              Prestação de serviços de PROJETO DE ARQUITETURA, abrangendo:
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

            {/* 1.2 Desenvolvimento com base em briefing e reunião */}
            <Numbered n="1.2">
              O projeto será desenvolvido com base nas informações fornecidas
              pela CONTRATANTE, por meio de: (a) formulário de briefing, a ser
              preenchido para caracterizar o projeto e detalhar expectativas e
              necessidades; e (b) reunião gravada via Meet entre as partes,
              opcionalmente, como referência adicional para atender necessidades
              específicas.
            </Numbered>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>2. OBRIGAÇÕES DAS PARTES</Text>
            <Text style={[styles.label, { marginTop: 4 }]}>CONTRATADA:</Text>
            <Bullet>Prestar os serviços conforme prazos e condições.</Bullet>
            <Bullet>
              Disponibilizar arquivos finais em PDF, JPEG e MP4 sem custos
              adicionais.
            </Bullet>
            <Bullet>
              Oferecer até 3 (três) revisões sem custos; ajustes excedentes
              poderão ser cobrados conforme tabela vigente.
            </Bullet>

            <Text style={[styles.label, { marginTop: 8 }]}>CONTRATANTE:</Text>
            <Bullet>
              Disponibilizar, em até 10 (dez) dias corridos, as informações e
              materiais possíveis (ex.: planta topográfica, especificações).
            </Bullet>
            <Bullet>Efetuar os pagamentos na forma do item 3.</Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>3. FORMA E PRAZO DE PAGAMENTO</Text>
            <Numbered n="3.1">
              Valor total do serviço:{" "}
              {valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              . Parcelamento/condições: {formasPagamento}.
            </Numbered>

            <Numbered n="3.2">
              O valor acordado não inclui taxas de prefeitura, impostos, custos
              de vistorias técnicas ou Registro de Responsabilidade Técnica
              (RRT). Caso necessários, serão cobrados à parte, não se
              responsabilizando a CONTRATADA por tais despesas.
            </Numbered>

            <Numbered n="3.3">Em caso de inadimplência:</Numbered>
            <Bullet>Multa de 2% (dois por cento) sobre o valor devido.</Bullet>
            <Bullet>Juros de mora de 1% (um por cento) ao mês.</Bullet>
            <Bullet>Suspensão dos serviços até a regularização.</Bullet>
          </View>
        </View>
      </Page>

      {/* ------------------------- PÁGINA 2 ---------------------------- */}
      <Page size="A4" style={styles.page} wrap>
        <Image src="/images/image4.jpg" style={styles.fullBg} fixed />
        <View style={styles.pageView}>
          <View style={styles.section}>
            <Text style={styles.h1}>4. ALTERAÇÕES E CANCELAMENTOS</Text>
            <Numbered n="4.1">
              Alterações solicitadas após a entrega do projeto poderão ser
              cobradas em 10% (dez por cento) do valor total do contrato.
            </Numbered>
            <Numbered n="4.2">Cancelamento pelo CONTRATANTE:</Numbered>
            <Bullet>Ressarcimento dos custos já incorridos.</Bullet>
            <Bullet>Multa de 10% (dez por cento) do valor total.</Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>5. PRAZO DE EXECUÇÃO</Text>
            <Numbered n="5.1">
              Entrega em até {prazoExecucao}, podendo ser ajustado mediante
              acordo entre as partes.
            </Numbered>
            <Numbered n="5.2">
              Suspensão do desenvolvimento por mais de 3 (três) meses, contados
              da assinatura, será considerada rescisão imotivada, aplicando-se o
              item 4.2.
            </Numbered>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>6. DIREITOS AUTORAIS E USO DO PROJETO</Text>
            <Bullet>
              O projeto é protegido pela legislação de direitos autorais.
            </Bullet>
            <Bullet>
              O CONTRATANTE recebe direito de uso exclusivo para execução da
              obra contratada, sendo vedada reprodução/alteração sem autorização
              prévia da CONTRATADA.
            </Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>7. ACEITE E ADESÃO</Text>
            <Bullet>Com a assinatura do CONTRATANTE; e/ou</Bullet>
            <Bullet>
              Pelo pagamento inicial ou uso dos serviços, configurando adesão
              automática.
            </Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>8. ENTREGA DOS ARQUIVOS</Text>
            <Bullet>Formatos sem custo: PDF, JPEG e MP4.</Bullet>
            <Bullet>
              Arquivos .DWG (ou outros não listados) poderão ser fornecidos
              mediante pagamento adicional de 5% do valor total do contrato,
              quitado previamente à entrega.
            </Bullet>
          </View>

          {/* NOVA CLÁUSULA 9: SIGILOSIDADE (do modelo) */}
          <View style={styles.section}>
            <Text style={styles.h1}>9. SIGILOSIDADE</Text>
            <Text style={styles.p}>
              Consideram-se confidenciais todas as informações, dados, imagens,
              valores, especificações e quaisquer conteúdos relacionados à obra,
              transmitidos por quaisquer meios, obrigando-se a CONTRATADA, seus
              prepostos e subcontratados a guardar absoluto sigilo.
            </Text>
            <Bullet>
              É vedada a utilização de imagens, menções ao nome da CONTRATANTE
              ou divulgação dos trabalhos em redes sociais, portfólios ou
              qualquer outro meio, sem autorização expressa e prévia da
              CONTRATANTE. A violação sujeita a CONTRATADA à multa de R$
              100.000,00 (cem mil reais), sem prejuízo de perdas e danos.
            </Bullet>
            <Bullet>
              Na hipótese de não aprovação, pela CONTRATANTE, de material
              publicitário eventualmente desenvolvido pela CONTRATADA, a
              CONTRATANTE pagará à CONTRATADA, a título de indenização única,
              geral e compensatória, 10% (dez por cento) do valor total do
              contrato, em razão dos custos, esforços e recursos despendidos.
            </Bullet>
          </View>

          <View style={styles.section}>
            <Text style={styles.h1}>10. FORO</Text>
            <Text style={styles.p}>
              Fica eleito o Foro da Comarca de São Paulo-SP para dirimir
              quaisquer dúvidas oriundas deste contrato.
            </Text>
          </View>

          {/* Assinaturas */}
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 100,
            }}
          >
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

            <View style={[styles.section, { marginTop: 24 }]}>
              <Text style={styles.assinaturaLinha}>
                ________________________________________ CONTRATADA
              </Text>
              <Text style={styles.p}>{contratadaRazaoSocial}</Text>

              <View style={{ marginTop: 16 }}>
                {props.signatureUrl ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 4,
                      marginTop: 16,
                    }}
                  >
                    <Image
                      src={props.signatureUrl}
                      style={styles.assinaturaImg}
                    />
                    <Text>CONTRATANTE</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.assinaturaLinha}>
                      ________________________________________
                    </Text>
                    <Text>CONTRATANTE</Text>
                  </>
                )}
                <Text style={{ fontSize: 10, marginTop: 4 }}>
                  CONTRATANTE: {contratanteNome}
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={styles.footerPage}
            render={({ pageNumber }) => `${pageNumber}`}
            fixed
          />
        </View>
      </Page>
    </Document>
  );
};
