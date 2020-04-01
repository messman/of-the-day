import styled, { css, theme } from "./theme";

/** Title for the page itself. */
export const PageTitle = styled.h1`
	font-size: 3.5rem;
	line-height: 3rem;
	font-weight: 600;
	margin: 0;
	margin-top: 2rem;
	margin-bottom: 1rem;
`;

/** Title of a section. */
export const Title = styled.h1`
	font-size: 2.6rem;
	line-height: 3rem;
	font-weight: 600;
	margin: 0;
	margin-top: 2rem;
	margin-bottom: 1rem;
`;

/** Title for key-val pairs or sub-sections. */
export const SubTitle = styled.p`
	font-size: 1.4rem;
	font-weight: 600;
	margin: 0;
	margin-top: 1.2rem;
`;

/** Regular paragraphs. */
export const Text = styled.p`
	font-size: 1.2rem;
	margin: 0;
	margin-top: .3rem;
`;

const textBoxStyle = css`
	font-size: 1.2rem;
	font-weight: 400;
	margin: 0;
	margin-top: 1.2rem;
	padding: .5rem;
	padding-bottom: 2rem;
`;

export const BadText = styled.p`
	${textBoxStyle}
	background-color: ${theme.color.badInfo};
`;

export const ImportantText = styled.p`
	${textBoxStyle}
	background-color: ${theme.color.importantInfo};
`;

/** Content separator. */
export const Bump = styled.div`
	margin-top: 1rem;
`;