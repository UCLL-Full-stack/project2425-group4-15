import { User } from '../../model/user';

test('given: valid values for user; when: User is created; then: fileds are set correctly', () => {
    const user = new User({
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        password: 'pw123',
    });
});
