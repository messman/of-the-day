import * as React from "react";
import * as Common from "@/styles/common";
import { TextPlaceholder } from "@/unit/components/placeholder";
import { RenderIf } from "@/unit/components/renderIf";

export interface PlaceholderRenderPropertyProps {
	isLoading: boolean,
	title: string,
	titleLength: number,
	showIfProperty: () => any,
	propertyOutput: () => any,
	propertyLength: number
}


export const PlaceholderRenderProperty: React.FC<PlaceholderRenderPropertyProps> = (props) => {
	return (
		<RenderIf show={props.isLoading || !!props.showIfProperty()}>
			{() =>
				<>
					<RenderIf show={!!props.title}>
						{() =>
							<>
								<Common.SubTitle>
									<TextPlaceholder show={props.isLoading} length={props.titleLength}>
										{() => <>{props.title}</>}
									</TextPlaceholder>
								</Common.SubTitle>
							</>
						}
					</RenderIf>
					<Common.Text>
						<TextPlaceholder show={props.isLoading} length={props.propertyLength}>
							{props.propertyOutput}
						</TextPlaceholder>
					</Common.Text>
				</>
			}
		</RenderIf>
	);
}