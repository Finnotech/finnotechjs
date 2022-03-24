import { SCOPES } from "../constants/scopes";

/**
 * For get auth grant type of scope by its name
 * @param scopeName Full scope name from `SCOPES`
 * @returns scope's `GRANT_TYPE`
 */
export const getGrantTypeFromScopeName = (scopeName: string): string | undefined => {
	for (let key of Object.keys(SCOPES)) {
		// @ts-ignore
		if (SCOPES[key].name === scopeName) {
			// @ts-ignore
			return SCOPES[key].authMode;
		}
	}
};