import { type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { newAdminSchema } from '~/db.server/schema/admin';
import { insertAdmin } from '~/util/services.server/admin-service';
import { logError } from '~/util/services.server/log-service';
import {
  createStandardErrorResponse,
  createStandardSuccessPostResponse,
} from '~/util/services.server/rest-service';

export async function action({ request }: ActionFunctionArgs) {
  const requestBody = Object.fromEntries(await request.formData());

  try {
    const newAdmin = await insertAdmin(await newAdminSchema.parseAsync(requestBody));

    return createStandardSuccessPostResponse(`inserted new admin with email ${newAdmin.email}`);
  } catch (error) {
    const errorMessage = logError(error);

    return createStandardErrorResponse(errorMessage);
  }
}

export default function Admin() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <br />
        <label htmlFor="firstName">First name</label>
        <input name="firstName" type="text" />
        <br />
        <label htmlFor="lastName">Last name</label>
        <input name="lastName" type="text" />
        <br />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        <br />
        <button type="submit">submit!</button>
      </Form>
    </div>
  );
}
