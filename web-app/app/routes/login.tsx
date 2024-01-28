import { type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { loginAdminSchema } from '~/db.server/schema/admin';
import { loginAdmin } from '~/util/services.server/admin-service';
import { logError } from '~/util/services.server/log-service';
import {
  createStandardErrorResponse,
  createStandardSuccessPostResponse,
} from '~/util/services.server/rest-service';

export async function action({ request }: ActionFunctionArgs) {
  const requestBody = Object.fromEntries(await request.formData());

  try {
    const admin = loginAdminSchema.parse(requestBody);
    const authenticated = await loginAdmin(admin);

    if (authenticated) {
      return createStandardSuccessPostResponse(`successfully authenticated ${admin.email}`);
    }

    return createStandardErrorResponse(`could not authenticate ${admin.email}`);
  } catch (error) {
    const errorMessage = logError(error);

    return createStandardErrorResponse(errorMessage);
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
