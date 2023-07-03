"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCuestionarioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cuestionario_dto_1 = require("./create-cuestionario.dto");
class UpdateCuestionarioDto extends (0, mapped_types_1.PartialType)(create_cuestionario_dto_1.CreateCuestionarioDto) {
}
exports.UpdateCuestionarioDto = UpdateCuestionarioDto;
//# sourceMappingURL=update-cuestionario.dto.js.map