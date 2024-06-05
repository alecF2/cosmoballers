import { type LoaderFunctionArgs, redirect, type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { loginAdminSchema } from '~/db.server/schema/admin';
import { loginAdmin } from '~/util/services.server/admin-service';
import { createRestResponse } from '~/util/services.server/rest-service';
import { createAdminSession, getAdminSessionData } from '~/util/services.server/session-service';

/**
 * if valid session is found, redirect to home page; if not, stay on page
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const adminData = await getAdminSessionData(request);

  if (adminData) {
    return redirect('/');
  }

  return createRestResponse({
    code: 200,
    message: 'not logged in as admin, no redirect',
  });
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const requestBody = Object.fromEntries(await request.formData());
    const credentials = loginAdminSchema.parse(requestBody);
    const authenticated = await loginAdmin(credentials);

    if (!authenticated) {
      throw new Error('credentials are invalid');
    }

    return await createAdminSession(request, credentials.email);
  } catch (error) {
    console.error(error);
    return createRestResponse({
      code: 401,
      error: `could not authenticate admin`,
    });
  }
}

export default function Login() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        <br />
        <button type="submit">log in!</button>
      </Form>
    </div>
  );
}
