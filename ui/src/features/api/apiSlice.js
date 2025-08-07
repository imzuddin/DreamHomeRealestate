import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000'}),
    tagTypes: ["Staff", "Clients", 'Branches'],
    endpoints: builder => ({
        getHealth: builder.query({ query: () => '/health' }),
        getStaff: builder.query({ query: () => '/staff/get_staff', providesTags: ( result = [], error) =>
            result ? [
                {type: 'Staff', id: 'LIST'},
                ...result.map(({ staffNo }) => ({type: 'Staff', id: staffNo })),
            ] : [{ type: 'Staff', id: 'LIST' }]
         }),
        updateStaff: builder.mutation({ 
            query: ({ staffNo, salary, telephone, mobile, email }) => ({
                url: `/staff/update_staff/${staffNo}`,
                method: "PATCH",
                body: {
                    salary, telephone, mobile, email,
                },
            }),
            invalidatesTags: [{ type: 'Staff', id: 'LIST' }],
        }),
        hireStaff: builder.mutation({
            query: staff => ({
                url: '/staff/hire',
                method: 'POST',
                body: staff,
            }),
            invalidatesTags: [{ type: 'Staff', id: 'LIST' }],
        }),
        getClients: builder.query({ query: () => "/clients/get_clients", providesTags: ( result = []) => 
            result ? [
                { type: 'Clients', id: 'LIST' },
                ...result.map(({ clientno }) => ({ type: 'Clients', id: clientno })),
            ] : [{ type: 'Clients', id: 'LIST' }]
         }),
        registerClient: builder.mutation({
            query: (client) => ({
                url: "/clients/new_client",
                method: "POST",
                body: client,
            }),
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }]
        }),
        deleteClient: builder.mutation({
            query: (clientno) => ({
                url: `/clients/delete_client/${clientno}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
        getBranches: builder.query({
            query: () => '/branches/get_branches',
            providesTags: (result = []) =>
                result ? [
                    { type: 'Branches', id: 'LIST' },
                    ...result.map(({ branchno }) => ({ type: 'Branches', id: branchno })),
                ] : [{ type: 'Branches', id: 'LIST' }],
        }),
        createBranch: builder.mutation({
            query: (branch) => ({
                url: '/branches/create_branch',
                method: 'POST',
                body: branch,
            }),
            invalidatesTags: [{ type: 'Branches', id: 'LIST' }],
        }),
        updateBranch: builder.mutation({
            query: ({ branchno, street, city, postcode }) => ({
                url: `/branches/update_branch/${branchno}`,
                method: 'PATCH',
                body: { street, city, postcode },
            }),
            invalidatesTags: [{ type: 'Branches', id: 'LIST' }],
        }),
        getBranchAddress: builder.query({
            query: (branchno) => `/branches/${branchno}/address`,
            providesTags: (result, error, branchno) => [{ type: 'Branches', id: branchno }],
        }),
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "/login/login",
                method: "POST",
                body: { username, password },
        }),
    }),
    }),
});

export const { 
    useGetHealthQuery, 
    useGetStaffQuery, 
    useUpdateStaffMutation, 
    useHireStaffMutation,
    useGetClientsQuery,
    useRegisterClientMutation,
    useDeleteClientMutation,
    useGetBranchesQuery,
    useCreateBranchMutation,
    useUpdateBranchMutation,
    useGetBranchAddressQuery,
    useLoginMutation,
} = api;