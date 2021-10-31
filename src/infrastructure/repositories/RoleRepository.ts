import BaseRepository from "./BaseRepository";

class RoleRepository extends BaseRepository {
  constructor({ models: { Role } }: any) {
    super({ Model: Role });
  }
}

export default RoleRepository;