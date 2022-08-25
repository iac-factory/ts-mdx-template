import {Authorization} from "..";

const {useAuthorization} = Authorization;
const {useSession} = Authorization;
const {useNavigator} = Authorization;

/***
 * Convenience Authorization Provider
 * ---
 *
 * @constructor
 */
export const Provider = {
    useAuthorization,
    useSession,
    useNavigator
};

export default Provider;

export type Session = Authorization.Session;