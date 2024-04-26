import Comment from "../model/comment.model";
import type { Request, Response } from "express";
import guardController from "@errors/guardController";
import { D_PAGE, D_PER_PAGE } from "@global/constants";
import formatRes from "@global/helpers/formatResponse";
import { convertToNumber } from "@global/helpers/general.helper";
import getPaginationValidationMws from "@global/middlewares/paginationValidation.mw";
import getValidatePerPageMw from "@errors/middlewares/validatePerPage.mw";
import createQuery from "@src/modules/advanced-search/middlewares/createQuery.mw";
import validateQuery from "@src/modules/advanced-search/middlewares/validateQuery.mw";

interface RType extends Request {
  query: {
    per_page?: string;
    page?: string;
    query: any;
  };
}

async function getCommentList(req: RType, res: Response) {
  const { page = D_PAGE, per_page = D_PER_PAGE } = req.query;
  const { query } = req.body;
  const paginateOptions = {
    page: convertToNumber(page),
    limit: convertToNumber(per_page),
  };
   
  const { docs, ...pagination } = await Comment.paginate(
    query,
    paginateOptions
  );

  res.status(200).json(formatRes("success", docs, pagination));
}

export const validator = [
  ...getPaginationValidationMws(),
  getValidatePerPageMw(),
  validateQuery("comment"),
  createQuery,
];
export const getCommentListController = guardController(getCommentList);
