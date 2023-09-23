qb-lock
https://streamable.com/fxjwpf

image image image

cfx post: https://forum.cfx.re/t/qb-lock-reseign/5171106

Template
exports['qb-lock']:StartLockPickCircle(amount, time, function(success)
Example useage
RegisterCommand("lpgame", function()
	local time = math.random(7,10)
	local circles = math.random(2,4)
	local success = exports['qb-lock']:StartLockPickCircle(circles, time, success)
	print(success)
	if success then
		print("WIN")
	else
		print("FAIL")
	end
end)
Useful Snippet
for everyone here that wants to add the minigame to other script in a very simple way

local seconds = math.random(9,12)
local circles = math.random(1,3)
local success = exports['qb-lock']:StartLockPickCircle(circles, seconds, success)
if success then
QBCore.Functions.Notify(" Success", "success")
end
