package admin

import (
	"cosmoballers/util"
	"net/http"

	"github.com/emicklei/go-restful/v3"
)

func (s AdminResource) WebService() *restful.WebService {
	ws := new(restful.WebService)

	ws.
		ApiVersion("v1").
		Path("/v1/admins").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)

	ws.Route(
		ws.POST("/").
			Doc("create an admin user").
			Reads(Admin{}).
			Writes(Admin{}).
			Returns(200, "SUCCESS", Admin{}).
			Returns(500, "ERROR", nil).
			To(
				func(req *restful.Request, res *restful.Response) {
					var create Admin
					req.ReadEntity(&create)

					admin, err := s.CreateOne(&create)
					if err != nil {
						res.WriteErrorString(http.StatusInternalServerError, "Server ran into problem")
						return
					}
					res.WriteHeaderAndEntity(http.StatusCreated, util.CreateDataPayload(&admin))
				},
			),
	)

	ws.Route(
		ws.GET("/").
			Doc("get all admin users").
			Writes([]Admin{}).
			Returns(200, "SUCCESS", Admin{}).
			Returns(500, "ERROR", nil).
			To(
				func(req *restful.Request, res *restful.Response) {
					admins, err := s.GetAll()
					if err != nil {
						res.WriteErrorString(http.StatusInternalServerError, "Server ran into problem")
						return
					}
					res.WriteEntity(util.CreateDataPayload(&admins))
				},
			),
	)

	ws.Route(
		ws.GET("/{adminId}").
			Doc("get an admin user").
			Writes(Admin{}).
			Returns(200, "SUCCESS", Admin{}).
			Returns(400, "BAD REQUEST", nil).
			Returns(404, "NOT FOUND", nil).
			Returns(500, "ERROR", nil).
			To(
				func(req *restful.Request, res *restful.Response) {
					id, err := util.StringToUInt(req.PathParameter("adminId"))
					if err != nil {
						res.WriteErrorString(
							http.StatusBadRequest,
							"Invalid value for parameter adminId: "+req.PathParameter("adminId"),
						)
						return
					}

					// TODO: find how to account for 404 here
					admin, err := s.GetOne(id)
					if err != nil {
						res.WriteErrorString(http.StatusInternalServerError, "Server ran into problem")
						return
					}
					res.WriteEntity(util.CreateDataPayload(&admin))
				},
			),
	)

	ws.Route(
		ws.PATCH("/{adminId}").
			Doc("update an admin user").
			Reads(Admin{}).
			Writes(Admin{}).
			Returns(200, "SUCCESS", Admin{}).
			Returns(400, "BAD REQUEST", nil).
			Returns(404, "NOT FOUND", nil).
			Returns(500, "ERROR", nil).
			To(
				func(req *restful.Request, res *restful.Response) {
					id, err := util.StringToUInt(req.PathParameter("adminId"))
					if err != nil {
						res.WriteErrorString(
							http.StatusBadRequest,
							"Invalid value for parameter adminId: "+req.PathParameter("adminId"),
						)
						return
					}

					var update Admin
					req.ReadEntity(&update)

					admin, err := s.UpdateOne(id, &update)
					if err != nil {
						res.WriteErrorString(http.StatusInternalServerError, "Server ran into problem")
						return
					}
					res.WriteEntity(util.CreateDataPayload(&admin))
				},
			),
	)

	ws.Route(
		ws.DELETE("/{adminId}").
			Doc("delete an admin user").
			Returns(200, "SUCCESS", nil).
			Returns(400, "BAD REQUEST", nil).
			Returns(404, "NOT FOUND", nil).
			Returns(500, "ERROR", nil).
			To(
				func(req *restful.Request, res *restful.Response) {
					id, err := util.StringToUInt(req.PathParameter("adminId"))
					if err != nil {
						res.WriteErrorString(
							http.StatusBadRequest,
							"Invalid value for parameter adminId: "+req.PathParameter("adminId"),
						)
						return
					}

					err = s.DeleteOne(id)
					if err != nil {
						res.WriteErrorString(http.StatusInternalServerError, "Server ran into problem")
					}
				},
			),
	)

	return ws
}
