# Finnotech-Easy
This project/package is to make use of [Finnotech](https://www.finnotech.ir?utm_medium=npm-package) open api easier in nodejs projects.

## Table of Content
- [Finnotech-Easy](#finnotech-easy)
  - [Table of Content](#table-of-content)
  - [Installing](#installing)
  - [Example](#example)
  - [Initialization config](#initialization-config)
  - [Services](#services)
    - [Token](#token)
      - [`getClientCredentialToken`](#getclientcredentialtoken)
    - [Oak - Deposit base services](#oak---deposit-base-services)
      - [`ibanInquiry` - استعلام شماره شبا](#ibaninquiry---استعلام-شماره-شبا)
      - [`groupIbanInquiry` - استعلام شبا گروهی](#groupibaninquiry---استعلام-شبا-گروهی)
      - [`cardBalance` - دریافت موجودی بن کارت](#cardbalance---دریافت-موجودی-بن-کارت)
      - [`cardStatement` - دریافت گردش بن کارت](#cardstatement---دریافت-گردش-بن-کارت)
      - [`depositToIban` - تبدیل شماره حساب به شبا](#deposittoiban---تبدیل-شماره-حساب-به-شبا)
      - [`cifInquiry` - استعلام شماره مشتری](#cifinquiry---استعلام-شماره-مشتری)
      - [`shahabInquiry` - استعلام کد شهاب](#shahabinquiry---استعلام-کد-شهاب)
    - [Credit](#credit---credit-base-services)
      - [`facilityInquiry` - استعلام تسهیلات](#facilityinquiry---استعلام-تسهیلات)
  - [Todos](#todos)

## Installing
Using npm:
```bash
$ npm i "https://github.com/ARTM2000/finnotech-easy.git"
```

## Example
```js
import Finnotech, { SCOPES } from 'finnotech-easy';

const finnotechServices = new Finnotech({
    clientId: 'myAppName', 
    clientSecret: 'myAppClientSecret',
    nid: 'nationalIdentity', // for app members
    getAccessToken: async (fullScopeName) => {
        // process to get require access token by scope name
        return 'accessToken';
    },
    getRefreshToken: async (fullScopeName) => {
        // process to get require refresh token by scope name
        return 'refreshToken';
    },
    setTokens: async (tokenData) => {
        const { 
            accessToken, 
            refreshToken, 
            lifeTime, 
            scopes,
            tokenType,
        } = tokenData;
        // do store token process here...
    },
});

const { TokenService, OakService } = finnotechServices;

const getIbanInquiryInfo = async (iban) => {
    try {
        // get token for require scopes. this function finally call setTokens.
        await TokenService.getClientCredentialToken([
            SCOPES.ibanInquiry.name,
        ]);

        // finally call ibanInquiry service
        const result = await OakService.ibanInquiry({ iban });
        console.log(result.data);
    } catch (err) {
        console.error(err);
    }
}

getIbanInquiryInfo('IRxxxxxxxxxxxxxxxxxxxxxxxx')
```

## Initialization config
| Name | Type | Description |
| -------------- | -------------- | -------------- |
| clientId | `string` | The clientId or app name of your confirmed application - `شناسه اپلیکیشن` |
| clientSecret | `string` | The app secret password - `گذرواژه` |
| nid | `string` | national identity of a app member that have access to call service |
| getAccessToken | `Function` | An **asynchronous** or **synchronous** `function` which will receive `fullScopeName` as props and expect to get `access token` for service call. __This function call before each service call__ |
| getRefreshToken | `Function` | An **asynchronous** or **synchronous** `function` which will receive `fullScopeName` as props and expect to get `refresh token` if service receive `invalid token` response. |
| setTokens | `Function` | An **asynchronous** or **synchronous** `function` which will receive `tokenData` as props which contain token information (`accessToken`, `refreshToken`, `lifeTime`, `scopes`, `tokenType`). Use this function to store tokens that will receive |
| useSandBox | `boolean` | `Optional`. If you want to use sandbox version of finnotech api, bass `true` otherwise it's not required |

## Services
### Token
#### `getClientCredentialToken`
For get client-credentials token for its scope(s) ([document page](https://devbeta.finnotech.ir/boomrang-get-clientCredential-token.html?utm_medium=npm-package)). This function just receive an array of client-credentials scope names. This function finally call `setTokens` e.g.
```js
TokenService.getClientCredentialToken([ SCOPES.ibanInquiry.name ]); // return Promise<void>
```
<hr/>

### Oak - Deposit base services
#### `ibanInquiry` - استعلام شماره شبا
For iban inquiry service ([document page](https://devbeta.finnotech.ir/oak-ibanInquiry.html?utm_medium=npm-package)). e.g.
```js
OakService.ibanInquiry({ iban: 'IRxxxxxxxxxxxxxxxxxxxxxxxx' }); // return Promise<IFinnotechIbanInquiryResponse>
```
#### `groupIbanInquiry` - استعلام شبا گروهی
For group iban inquiry service ([document page](https://devbeta.finnotech.ir/oak-groupIbanInquiry.html?utm_medium=npm-package)):
- submit group iban inquiry:
  ```js
  OakService.submitGroupIbanInquiry({ file: 'csv buffer or base64 content' }); // return Promise<IFinnotechSubmitGroupIbanInquiryResponse>
  ```
- get result of group iban inquiry:
  ```js
  OakService.getResultOfGroupIbanInquiry({ inquiryTrackId: 'submit track id' }); // return Promise<string>
  ```
- retry group iban inquiry request:
  ```js
  OakService.retryGroupIbanInquiry({ inquiryTrackId: 'submit track id' }); // return Promise<IFinnotechSubmitGroupIbanInquiryResponse>
  ```

#### `cardBalance` - دریافت موجودی بن کارت
For card balance service ([document page](https://devbeta.finnotech.ir/oak-card-balance.html?utm_medium=npm-package)). e.g.
```js
OakService.cardBalance({ card: '6362142376876523' }); // return Promise<IFinnotechCardBalanceResponse>
```

#### `cardStatement` - دریافت گردش بن کارت
For card statement service ([document page](https://devbeta.finnotech.ir/oak-card-statement.html?utm_medium=npm-package)). e.g.
```js
OakService.cardStatement({
    card: '6362142376876523',
    fromDate: '990421', // optional
    toDate: '991021', // optional
}); // return Promise<IFinnotechCardStatementResponse>
```

#### `depositToIban` - تبدیل شماره حساب به شبا
For deposit to iban service ([document page](https://devbeta.finnotech.ir/oak-deposits-to-IBAN-get.html?utm_medium=npm-package)). e.g.
```js
OakService.depositToIban({
    deposit: 'xxxxxxxxxxxxxx',
    bank: '10', // from document
}); // return Promise<IFinnotechDepositToIbanResponse>
```

#### `cifInquiry` - استعلام شماره مشتری
For cif inquiry service ([document page](https://devbeta.finnotech.ir/oak-cifInquiry.html?utm_medium=npm-package)). e.g.
```js
OakService.cifInquiry({ nid: '1234567890' }); // return Promise<IFinnotechCifInquiryResponse>
```

#### `shahabInquiry` - استعلام کد شهاب
For shahab inquiry service ([document page](https://devbeta.finnotech.ir/oak-shahabInquiry.html?utm_medium=npm-package)). e.g.
```js
OakService.shahabInquiry({
    nid: '1234567890',
    birthData: '13790430',
}); // return Promise<IFinnotechShahabInquiryResponse>
```

<hr/>

### Credit - Credit base services
#### `facilityInquiry` - استعلام تسهیلات
For facility inquiry service ([document page](https://devbeta.finnotech.ir/credit-facility-inquiry-get.html?utm_medium=npm-package)). e.g.
```js
CreditService.facilityInquiry({ nid: 'xxxxxxxxxx' }); // return Promise<IFinnotechFacilityInquiryResponse>
```

## Todos
- [x] Client-Credentials token
- [x] Oak only Client-Credentials services
- [ ] Credit only Client-Credentials services
- [ ] Utility and Convert services
- [ ] Open account list services
- [ ] General inquiry services
- [ ] Wallet services
- [ ] Authorization-Code token
- [ ] Authorization-SMS token
- [ ] Oak Authorization-Code services
- [ ] Credit Authorization-SMS services
- [ ] Service call inquiry list - wages
- [ ] Get list of tokens
- [ ] Revoke token
