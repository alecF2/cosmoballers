import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import { logout } from '~/util/services.server/session-service';

/**
 * logs admin out when invoked through form action
 */
export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

/**
 * redirect to home if anyone tries to visit through browser
 */
export async function loader() {
  return redirect('/');
}
