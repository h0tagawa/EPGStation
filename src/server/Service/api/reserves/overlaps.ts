import { Operation } from 'express-openapi';
import { ReservesModelInterface } from '../../../Model/Api/ReservesModel';
import factory from '../../../Model/ModelFactory';
import * as api from '../../api';

export const get: Operation = async(req, res) => {
    const reserves = <ReservesModelInterface> factory.get('ReservesModel');

    try {
        const results = await reserves.getOverlaps(req.query.limit, req.query.offset);
        api.responseJSON(res, 200, results);
    } catch (err) {
        api.responseServerError(res, err.message);
    }
};

get.apiDoc = {
    summary: '予約 overlap 一覧を取得',
    tags: ['reserves'],
    description: '予約 overlap 一覧を取得する',
    parameters: [
        { $ref: '#/parameters/limit' },
        { $ref: '#/parameters/offset' },
    ],
    responses: {
        200: {
            description: '予約 overlap 一覧を取得しました',
            schema: {
                type: 'object',
                properties: {
                    reserves: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Reserve',
                        },
                    },
                    total: { $ref: '#/definitions/total' },
                },
            },
        },
        default: {
            description: '予期しないエラー',
            schema: {
                $ref: '#/definitions/Error',
            },
        },
    },
};

