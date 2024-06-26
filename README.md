[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)]

# BCAT

B.C. Active Transportation

### Prerequisites

- <a href='https://nodejs.org/en/download/' target='_blank'> Node.js </a> version 16.18.1
- <a href='https://reactjs.org/docs/getting-started.html' target='_blank' > React </a> version 18.1.0
- <a href='https://nextjs.org/' target='_blank' > Next.js </a> version 12.3.1
- <a href='https://nestjs.com/' target='_blank' > Nest.js </a> version 8.2.3
- <a href='https://typeorm.io/' target='_blank' >TypeORM </a> version 0.2.41
- <a href='https://tailwindcss.com/docs/installation' target='_blank' >TailwindCSS </a> version 3.2.4
- <a href='https://www.docker.com/products/docker-desktop/' target='_blank' > Docker </a> - for local development in place of Openshift
- <a href='https://www.postgresql.org/download/' target='_blank' >PostgreSQL </a> - version 12.12

## Mandatory Dependencies

- IDIR service account with access to Active Directory (LDAP) service

## Local Development

### Configuration

Use the following steps to configure the local development environment

1. Clone the repository:

   ```
   git clone https://github.com/bcgov/BCAT.git

   ```

2. Configure the development settings

   - Create the `client/.env` file and add the following content:

   ```
      NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
      NEXT_PUBLIC_KC_AUTH_URL=<auth-url>
      NEXT_PUBLIC_KC_AUTH_REALM=<realm-id>
      NEXT_PUBLIC_KC_AUTH_CLIENT_ID=<client-id>
      NEXT_PUBLIC_SERVER_URL= http://localhost:8080/api/v1
      NEXT_PUBLIC_INFRASTRUCTURE_PROJECT=<formId>
      NEXT_PUBLIC_NETWORK_PROJECT=<formId>
   ```

   _Note: replace placeholder values_

   - Create the `api/.env` file and add the following content:

   ```
      KC_AUTH_URL=<auth-url>
      KC_AUTH_REALM=<realm-id>
      KC_AUTH_CLIENT_ID=<client-id>
      INFRASTRUCTURE_FORM=<formId>
      NETWORK_FORM=<formId>
   ```

   _Note: replace placeholder values_

### Run

3. Setup local development environment:

   Windows `make` is required. It can be located here: https://gnuwin32.sourceforge.net/packages/make.htm Please add the `<make_home>\bin` directory to the Windows path.

   To run Application in Docker
   cd root folder

   ```
       make run-local

   ```

## Deployment

- openshift