import { User } from '../../model/user';

test('given: valid values for user; when: User is created; then: fileds are set correctly and user is created', () => {
    const user = new User({
        id: 1,
        username: 'testUser',
        email: 'test@example.com',
        password: 'pw123',
    });

    expect(user.getId()).toEqual(1);
    expect(user.getUsername()).toEqual('testUser');
    expect(user.getEmail()).toEqual('test@example.com');
    expect(user.getPassword()).toEqual('pw123');
});
