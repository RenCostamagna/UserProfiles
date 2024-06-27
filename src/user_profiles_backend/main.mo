import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor UserProfile {

  type User = {
    username: Text;
    fullname: Text;
    email: Text;
    bio: Text; 
  };

  type UserID = Nat32;

  stable var id: UserID = 0;
  let userList = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);

  private func generateID () : Nat32 {
    id += 1;
    return id;  
  };

  public query ({caller}) func whoami(): async Principal{
    return (caller);
  };

  public func createUser(username : Text, fullname: Text, email: Text, bio: Text): async () {
    let user: User = { username=username; fullname=fullname; email=email; bio=bio };
    userList.put(Nat32.toText(generateID()), user);
    Debug.print("New user create! ID: " #Nat32.toText(id));
    return();
  };
  
  public query func getUser ( id: Text ): async ?User {
    let user: ?User = userList.get(id);
    Debug.print("User ID: " #id);
    return (user);
  };

  public query func getAllUsers (): async[(Text, User)]{
    let userItera : Iter.Iter<(Text, User)> = userList.entries();
    let userArray: [(Text,User)] = Iter.toArray(userItera);
    return userArray;
  };

  public func updateUser (id: Text, username : Text, fullname: Text, email: Text, bio: Text): async Bool {
    let user: ?User = userList.get(id);

    switch (user) {
      case (null) {
        return false;
      };
      case (?currentUser) {
        let newUser = { username=username; fullname=fullname; email=email; bio=bio };
        userList.put(id, newUser);
        Debug.print("User updated! ID: " # id);
        return true;
      };
    };
  };

  public func deleteUser(id: Text): async Bool {
    let user: ?User = userList.get(id);
    switch (user) {
      case (null) {
        return false;
      };
      case (_) {
        ignore userList.remove(id);
        Debug.print("User deleted ID: " # id);
        return true;
      };
    };
  };

};
