import { UPDATE_PROFILE_URL } from '../constants/ApiConstants';

export async function updateProfile(id: number, data: any) {
    const response = await fetch(
        `${UPDATE_PROFILE_URL}${id}`,
        {
            method: 'PUT',
            // headers: { 'Content-Type':  'multipart/form-data' },
            body: data
        }
    )

    return await response;
}