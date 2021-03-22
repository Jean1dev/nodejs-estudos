const configurationEnvMock = jest.fn()
//@ts-ignore
configurationEnvMock.getConfigurationSetting = jest.fn().mockImplementation(({ key }) => {
    return new Promise((resolve, reject) => {
        const find = envs.filter(env => env.key === key)
        if (find)
            resolve({ value: find[0].value })
        else
            reject('Variavel de ambiente não encontrada')
    })
})

jest.mock('@azure/app-configuration', () => ({
    AppConfigurationClient: jest.fn().mockImplementation(() => (configurationEnvMock))
}))