describe('Hello Controller', () => {
    it('should return a greeting message', () => {
        const expectedMessage = 'Hello, World!';
        const actualMessage = helloController.greet(); // Asumiendo que helloController está importado
        expect(actualMessage).toBe(expectedMessage);
    });
});